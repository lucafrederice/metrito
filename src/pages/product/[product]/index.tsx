import Dashboard from "@/components/templates/dashboard";
import { Product as ProductType, Transaction } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { prisma } from "../../../../prisma/client";

export const getStaticPaths = async () => {
    const products = await prisma.product.findMany({
        select: {
            id: true
        }
    })
    return {
        paths: [...products.map(product => {
            return {
                params: {
                    product: String(product.id)
                }
            }
        })],
        fallback: "blocking"
    }
}

export const getStaticProps = async (context: any) => {
    const { product: id } = context.params

    const name = await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            name: true
        }
    })

    const desc = await prisma.transaction.findMany({
        orderBy: {
            order_date: "desc"
        },
        include: {
            product: true,
        },
        where: {
            productId: Number(id)
        }
    })

    const tableCount = await prisma.transaction.count({
        where: {
            productId: Number(id)
        }
    })


    const table = desc.map(
        transaction => {
            return {
                id: transaction.id,
                href: `/transaction/${transaction.id}`,
                name: transaction.product?.name,
                amount: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: transaction.currency || "BRL" }).format(Number(transaction.price?.toFixed(2))),
                currency: transaction.currency,
                status: transaction.status,
                date: transaction?.order_date?.toLocaleDateString(),
                datetime: transaction?.order_date?.toISOString()
            }
        }
    )

    const asc = await prisma.transaction.findMany({
        orderBy: {
            order_date: "asc"
        },
        where: {
            productId: Number(id)
        }
    })

    const transactions: any = []

    if (asc)
        for (let i = 0; i < asc?.length; i++) {
            const transaction = asc[i]
            let approved_date = null
            let order_date = null
            let warranty_expire_date = null
            let price = null
            let hotmart_fee_total = null
            let hotmart_fee_fixed = null
            let hotmart_fee_base = null


            if (transaction.approved_date)
                approved_date = transaction.approved_date.toLocaleDateString()

            if (transaction.order_date)
                order_date = transaction.order_date.toLocaleDateString()

            if (transaction.warranty_expire_date)
                warranty_expire_date = transaction.warranty_expire_date.toLocaleDateString()

            if (transaction.price) {
                if (transaction.currency === "USD") price = Number(transaction.price.toFixed(2)) * 5
                if (transaction.currency !== "USD") price = Number(transaction.price.toFixed(2))
            }

            if (transaction.hotmart_fee_total) hotmart_fee_total = Number(transaction.hotmart_fee_total.toFixed(2))
            if (transaction.hotmart_fee_fixed) hotmart_fee_fixed = Number(transaction.hotmart_fee_fixed.toFixed(2))
            if (transaction.hotmart_fee_base) hotmart_fee_base = Number(transaction.hotmart_fee_base.toFixed(2))

            transactions.push({
                ...transaction,
                approved_date,
                order_date,
                warranty_expire_date,
                price,
                hotmart_fee_total,
                hotmart_fee_fixed,
                hotmart_fee_base
            })
        }


    const transactionByDay: {
        date: string,
        Approved: number,
        Cancelled: number,
    }[] = []


    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]

        const alreadyExists = transactionByDay.find(trans => trans.date === transaction.order_date)

        if (alreadyExists) {
            if (transaction.status === "CANCELLED") alreadyExists.Cancelled += transaction.price
            if (transaction.status === "COMPLETE") alreadyExists.Approved += transaction.price
        }

        if (!alreadyExists)
            transactionByDay.push({
                date: transaction.order_date,
                Approved: transaction.status === "COMPLETE" ? transaction.price : 0,
                Cancelled: transaction.status === "CANCELLED" ? transaction.price : 0,
            })
    }

    const transactionByPaymentType: {
        type: string,
        sales: number
    }[] = []

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]

        const alreadyExists = transactionByPaymentType.find(trans => trans.type === transaction.payment_type)

        if (alreadyExists && transaction.status === "COMPLETE") alreadyExists.sales += transaction.price
        if (!alreadyExists && transaction.status === "COMPLETE") transactionByPaymentType.push({
            type: transaction.payment_type,
            sales: transaction.price
        })
    }

    const paymentTypes: string[] = [...transactionByPaymentType.map(trans => trans.type.toLowerCase())]

    return {
        props: {
            transactionByDay,
            transactionByPaymentType,
            paymentTypes,
            table,
            tableCount,
            ...name
        },
    }
}


export default function Product(props: any) {
    const dashboardProps = {
        ...props,
        pageName: props.name
    }


    return (
        <>
            <Head>
                <title>{props.name}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Dashboard {...dashboardProps} />
        </>
    )
}
