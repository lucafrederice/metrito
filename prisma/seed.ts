import axios from "axios"
import { access_token, Commission, getCachedToken, getNewToken, History, SalesParticipants, Token, tokenIsExpired, URL } from "./resources"
import { prisma } from "./client"
import { Token as PrismaToken } from "@prisma/client"

export default async function seed() {
    let token = await getCachedToken()

    if (token && tokenIsExpired(token)) {
        token = await getNewToken()
    }

    const config = {
        headers: {
            Authorization: `${token?.token_type} ${token?.value}`
        }
    }

    const history_completed: History = await axios.get(
        URL.history.completed,
        config
    )
        .then(res => res.data)

    const history_cancelled: History = await axios.get(
        URL.history.cancelled,
        config
    )
        .then(res => res.data)

    const history = [
        ...history_completed.items,
        ...history_cancelled.items
    ]

    for (let i = 0; i < history.length; i++) {
        const item = history[i]


        const upsertItem = await prisma.transaction.upsert({
            where: {
                id: item.purchase.transaction
            },
            update: {
                status: item.purchase.status,
                order_date: new Date(item.purchase.order_date),
                approved_date: new Date(item.purchase.approved_date),
                warranty_expire_date: new Date(item.purchase.warranty_expire_date),
                is_subscription: item.purchase.is_subscription,
                commission_as: item.purchase.commission_as,
                price: item.purchase.price.value,
                currency: item.purchase.price.currency_code,
                offer_code: item.purchase.offer.code,
                payment_mode: item.purchase.offer.payment_mode,
                payment_type: item.purchase.payment.type,
                payment_method: item.purchase.payment.method,
                installments_number: item.purchase.payment.installments_number,
                hotmart_fee_total: item.purchase.hotmart_fee.total,
                hotmart_fee_fixed: item.purchase.hotmart_fee.fixed,
                hotmart_fee_base: item.purchase.hotmart_fee.base,
                hotmart_fee_currency: item.purchase.hotmart_fee.currency_code,
            },
            create: {
                id: item.purchase.transaction,
                status: item.purchase.status,
                order_date: new Date(item.purchase.order_date),
                approved_date: new Date(item.purchase.approved_date),
                warranty_expire_date: new Date(item.purchase.warranty_expire_date),
                is_subscription: item.purchase.is_subscription,
                commission_as: item.purchase.commission_as,
                price: item.purchase.price.value,
                currency: item.purchase.price.currency_code,
                offer_code: item.purchase.offer.code,
                payment_mode: item.purchase.offer.payment_mode,
                payment_type: item.purchase.payment.type,
                payment_method: item.purchase.payment.method,
                installments_number: item.purchase.payment.installments_number,
                hotmart_fee_total: item.purchase.hotmart_fee.total,
                hotmart_fee_fixed: item.purchase.hotmart_fee.fixed,
                hotmart_fee_base: item.purchase.hotmart_fee.base,
                hotmart_fee_currency: item.purchase.hotmart_fee.currency_code,
            }
        })

        const upsertProduct = await prisma.product.upsert({
            where: {
                id: item.product.id
            },
            update: {
                name: item.product.name,
                transactions: {
                    connect: {
                        id: item.purchase.transaction
                    }
                }

            },
            create: {
                id: item.product.id,
                name: item.product.name,
                transactions: {
                    connect: {
                        id: item.purchase.transaction
                    }
                }
            }
        })

    }

    const participants_completed: SalesParticipants = await axios.get(
        URL.participants.completed,
        config
    )
        .then(res => res.data)

    const participants_cancelled: SalesParticipants = await axios.get(
        URL.participants.cancelled,
        config
    )
        .then(res => res.data)

    const participantsByTransaction = [
        ...participants_completed.items,
        ...participants_cancelled.items
    ]

    const participants: {
        user: {
            name: string,
            ucode: string,
            trade_name: string,
            cellphone: string,
            phone: string,
            documents: {
                type: string,
                value: string
            }[],
            address: {
                address: string,
                neighborhood: string,
                country: string,
                number: string,
                zip_code: string,
                complement: string,
                state: string,
                city: string
            },
            locale: string,
            email: string,
        },
        transactions: {
            transactionId: string,
            role: string,
            productId: number,
            productName: string
        }[]
    }[] = []

    for (let i = 0; i < participantsByTransaction.length; i++) {
        const transaction = participantsByTransaction[i]

        for (let x = 0; x < transaction.users.length; x++) {
            const participant = transaction.users[x]

            const alreadyExists = participants.find((item) => item?.user?.ucode === participant.user.ucode)

            if (alreadyExists)
                alreadyExists.transactions.push({
                    transactionId: transaction.transaction,
                    role: participant.role,
                    productId: transaction.product.id,
                    productName: transaction.product.name
                })

            if (!alreadyExists)
                participants.push({
                    user: participant.user,
                    transactions: [{
                        transactionId: transaction.transaction,
                        role: participant.role,
                        productId: transaction.product.id,
                        productName: transaction.product.name
                    }]
                })
        }
    }

    for (let i = 0; i < participants.length; i++) {
        const participant = participants[i]


        const documents: {
            documents: {
                connectOrCreate: {
                    where: {
                        value: string
                    },
                    create: {
                        value: string,
                        type: string
                    }
                }[]
            }
        } = {
            documents: {
                connectOrCreate: []
            }
        }

        for (let x = 0; x < participant.user.documents.length; x++) {
            const document = participant.user.documents[x]
            documents.documents.connectOrCreate.push({
                where: {
                    value: document.value
                },
                create: {
                    value: document.value,
                    type: document.type
                }
            })
        }

        const products: {
            products: {
                connectOrCreate: {
                    where: {
                        id: number,
                    },
                    create: {
                        id: number,
                        name: string
                    }
                }[]
            }
        } = {
            products: {
                connectOrCreate: []
            }
        }

        for (let x = 0; x < participant.transactions.length; x++) {
            const product = participant.transactions[x]
            if (product.role === "PRODUCER") products.products.connectOrCreate.push({
                where: {
                    id: product.productId
                },
                create: {
                    id: product.productId,
                    name: product.productName
                }
            })
        }

        const transactions: {
            transactions: {
                connectOrCreate: {
                    where: {
                        id: string,
                    },
                    create: {
                        id: string,
                    }
                }[]
            }
        } = {
            transactions: {
                connectOrCreate: []
            }
        }

        for (let x = 0; x < participant.transactions.length; x++) {
            const trans = participant.transactions[x]
            if (trans.role === "BUYER") transactions.transactions.connectOrCreate.push({
                where: {
                    id: trans.transactionId
                },
                create: {
                    id: trans.transactionId,
                }
            })
        }

        const upsertUser = await prisma.user.upsert({
            where: {
                id: participant.user.ucode,
            },
            update: {
                name: participant.user.name,
                trade_name: participant.user.trade_name,
                email: participant.user.email,
                phone: participant.user.phone,
                cellphone: participant.user.cellphone,
                locale: participant.user.locale,

                address: {
                    create: {
                        street: participant.user.address.address,
                        neighborhood: participant.user.address.neighborhood,
                        country: participant.user.address.country,
                        number: participant.user.address.number,
                        zip_code: participant.user.address.zip_code,
                        complement: participant.user.address.complement,
                        state: participant.user.address.state,
                        city: participant.user.address.city
                    }
                },


                ...documents,
                ...products,
                ...transactions

            },
            create: {
                id: participant.user.ucode,
                name: participant.user.name,
                trade_name: participant.user.trade_name,
                email: participant.user.email,
                phone: participant.user.phone,
                cellphone: participant.user.cellphone,
                locale: participant.user.locale,

                address: {
                    create: {
                        street: participant.user.address.address,
                        neighborhood: participant.user.address.neighborhood,
                        country: participant.user.address.country,
                        number: participant.user.address.number,
                        zip_code: participant.user.address.zip_code,
                        complement: participant.user.address.complement,
                        state: participant.user.address.state,
                        city: participant.user.address.city
                    }
                },


                ...documents,
                ...products,
                ...transactions
            }
        })

    }

    const commissions_completed: Commission = await axios.get(
        URL.commissions.completed,
        config
    )
        .then(res => res.data)

    const commissionsByTransaction = [
        ...commissions_completed.items,
    ]

    const commissionsByUser: {
        id: string,
        name: string,
        email: string,
        commissions: {
            transactionId: string,
            value: number,
            currency: string,
            source: string,
        }[]
    }[] = []

    for (let i = 0; i < commissionsByTransaction.length; i++) {
        const commissionByTransaction = commissionsByTransaction[i]

        for (let x = 0; x < commissionByTransaction.commissions.length; x++) {
            const commissionByUser = commissionByTransaction.commissions[x]

            const alreadyExists = commissionsByUser.find(user => user.id === commissionByUser.user.ucode)

            if (alreadyExists) alreadyExists.commissions.push({
                transactionId: commissionByTransaction.transaction,
                value: commissionByUser.commission.value,
                currency: commissionByUser.commission.currency_code,
                source: commissionByUser.source
            })

            if (!alreadyExists) commissionsByUser.push({
                id: commissionByUser.user.ucode,
                name: commissionByUser.user.name,
                email: commissionByUser.user.email,
                commissions: [
                    {
                        transactionId: commissionByTransaction.transaction,
                        value: commissionByUser.commission.value,
                        currency: commissionByUser.commission.currency_code,
                        source: commissionByUser.source
                    }
                ]
            })
        }

    }

    for (let i = 0; i < commissionsByUser.length; i++) {
        const user = commissionsByUser[i]

        const commissions = user.commissions.map(commission => {
            return {
                value: commission.value,
                currency: commission.currency,
                source: commission.source,
                transactionId: commission.transactionId
            }
        })

        const upsertUser = await prisma.user.upsert({
            where: {
                id: user.id
            },
            update: {
                name: user.name,
                email: user.email,
                commissions: {
                    deleteMany: {},
                    createMany: {
                        data: [
                            ...commissions
                        ]
                    }
                }
            },
            create: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
    }
}