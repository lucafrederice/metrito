import { Token as PrismaToken } from "@prisma/client"
import axios from "axios"
import { prisma } from "./client"

export type HistoryItems = {
    product: {
        id: number,
        name: string,
    },
    purchase: {
        commission_as: string,
        approved_date: number,
        transaction: string,
        order_date: number,
        status: string,
        is_subscription: boolean,
        warranty_expire_date: number,
        payment: {
            method: string,
            installments_number: number,
            type: string
        },
        price: {
            currency_code: string,
            value: number
        },
        hotmart_fee: {
            fixed: number,
            total: number,
            currency_code: string,
            base: number
        },
        offer: {
            code: string,
            payment_mode: string
        }
    },
    producer: {
        ucode: string,
        name: string
    },
    buyer: {
        name: string,
        ucode: string,
        email: string
    }
}

export type History = {
    items: HistoryItems[]
}

export type SummaryItems = {
    total_items: number,
    total_value: {
        currency_code: string,
        value: number
    }
}

export type Summary = {
    items: SummaryItems[]
}

export type SalesParticipantsItems = {
    transaction: string,
    product: {
        name: string,
        id: number
    },
    users: {
        role: string,
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
        }
    }[],
}

export type SalesParticipants = {
    items: SalesParticipantsItems[]
}

export type CommissionItems = {
    transaction: string,
    exchange_rate_currency_payout: number,
    commissions: {
        source: string,
        user: {
            ucode: string,
            name: string,
            email: string
        },
        commission: {
            value: number,
            currency_code: string
        }
    }[]
}

export type Commission = {
    items: CommissionItems[]
}

export type SalesPriceBreakdownItems = {
    real_conversion_rate: string,
    transaction: string,
    total: {
        value: number,
        currency_code: string,
    },
    base: {
        value: number,
        currency_code: string
    },
    fee: {
        value: number,
        currency_code: string,
    },
    product: {
        id: number,
        name: string,
    },
    vat: {
        value: number,
        currency_code: string,
    },
}

export type SalesPriceBreakdown = {
    items: SalesPriceBreakdownItems[]
}

export type Token = {
    access_token: any,
    token_type: string,
    expires_in: number,
    scope: string,
    jti: string
}

export const URL = {
    history: {
        completed: "https://developers.hotmart.com/payments/api/v1/sales/history?transaction_status=COMPLETE&start_date=1617246000000&end_date=1622343600000",
        cancelled: "https://developers.hotmart.com/payments/api/v1/sales/history?transaction_status=CANCELLED&start_date=1617246000000&end_date=1622343600000"
    },
    summary: {
        completed: "https://developers.hotmart.com/payments/api/v1/sales/summary?transaction_status=COMPLETE&start_date=1617246000000&end_date=1622343600000",
        cancelled: "https://developers.hotmart.com/payments/api/v1/sales/summary?transaction_status=CANCELLED&start_date=1617246000000&end_date=1622343600000"
    },
    commissions: {
        completed: "https://developers.hotmart.com/payments/api/v1/sales/commissions?transaction_status=COMPLETE&start_date=1617246000000&end_date=1622343600000",
        cancelled: "https://developers.hotmart.com/payments/api/v1/sales/commissions?transaction_status=CANCELLED&start_date=1617246000000&end_date=1622343600000"
    },
    participants: {
        completed: "https://developers.hotmart.com/payments/api/v1/sales/users?transaction_status=COMPLETE&start_date=1617246000000&end_date=1622343600000",
        cancelled: "https://developers.hotmart.com/payments/api/v1/sales/users?transaction_status=CANCELLED&start_date=1617246000000&end_date=1622343600000"
    },
    pricebreakdown: {
        completed: "https://developers.hotmart.com/payments/api/v1/sales/price/details?transaction_status=COMPLETE&start_date=1617246000000&end_date=1622343600000",
        cancelled: "https://developers.hotmart.com/payments/api/v1/sales/price/details?transaction_status=CANCELLED&start_date=1617246000000&end_date=1622343600000"
    },
}

export const tokenIsExpired = (token: PrismaToken) => token?.expires_in ? Date.now() > token.expires_in.getDate() : true


export const access_token = "access_token"

export const getNewToken = async () => {
    const newToken: Token = await axios.post(
        `https://api-sec-vlc.hotmart.com/security//oauth/token?grant_type=client_credentials&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}`,
        {},
        {
            headers: {
                Authorization: `Basic ${process.env.basic_token}`
            }
        }
    )
        .then(res => res.data)

    const token = await prisma.token.upsert({
        where: {
            type: access_token
        },
        update: {
            value: newToken.access_token,
            expires_in: new Date(Date.now() + newToken.expires_in * 1000),
            token_type: newToken.token_type,
            scope: newToken.scope,
            jti: newToken.jti
        },
        create: {
            type: access_token,
            value: newToken.access_token,
            expires_in: new Date(Date.now() + newToken.expires_in * 1000),
            token_type: newToken.token_type,
            scope: newToken.scope,
            jti: newToken.jti
        }
    })

    return token
}

export const getCachedToken = async () => {
    const token = await prisma.token.findUnique({
        where: {
            type: access_token
        }
    })
    return token
}