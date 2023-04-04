import { prisma } from "../../prisma/client";


export default async function getProduct(id?: string) {
    const productId = Number(id)

    const name = id ? await prisma.product.findUnique({
        where: {
            id: productId
        },
        select: {
            name: true
        }
    }) : {
        name: "Home"
    }

    const where = id ? {
        where: {
            productId: productId
        }
    } : undefined

    const desc = await prisma.transaction.findMany({
        ...where,
        include: {
            product: true
        },
        orderBy: {
            order_date: "desc"
        },
    })

    const tableCount = await prisma.transaction.count({
        ...where
    })

    const table = desc.map(
        transaction => ({
            id: transaction.id,
            href: `/transaction/${transaction.id}`,
            name: transaction.product?.name,
            amount: new Intl.NumberFormat("pt-BR", { style: "currency", currency: transaction.currency || "BRL" }).format(Number(transaction.price?.toFixed(2))),
            currency: transaction.currency,
            status: transaction.status,
            date: transaction?.order_date?.toLocaleDateString(),
            datetime: transaction?.order_date?.toISOString()
        })
    )

    const asc = await prisma.transaction.findMany({
        ...where,
        orderBy: {
            order_date: "asc"
        }
    })

    const transactions: any[] = []

    if (asc)
        for (let i = 0; i < asc?.length; i++) {
            const transaction = asc[i]
            let approved_date = null
            let order_date = null
            let warranty_expire_date = null
            let price = null
            let hotmart_fee_base = null
            let hotmart_fee_fixed = null
            let hotmart_fee_total = null

            if (transaction.approved_date)
                approved_date = transaction.approved_date.toLocaleString()

            if (transaction.order_date)
                order_date = transaction.order_date.toLocaleDateString()

            if (transaction.warranty_expire_date)
                warranty_expire_date = transaction.warranty_expire_date.toLocaleDateString()

            if (transaction.price)
                price = transaction.currency === "USD" ? Number(transaction.price.toFixed(2)) * 5 : Number(transaction.price.toFixed(2))

            if (transaction.hotmart_fee_total)
                hotmart_fee_total = Number(transaction.hotmart_fee_total.toFixed(2))
            if (transaction.hotmart_fee_fixed)
                hotmart_fee_fixed = Number(transaction.hotmart_fee_fixed.toFixed(2))
            if (transaction.hotmart_fee_base)
                hotmart_fee_base = Number(transaction.hotmart_fee_base.toFixed(2))

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
        Cancelled: number
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
        transactionByDay,
        transactionByPaymentType,
        paymentTypes,
        table,
        tableCount,
        id,
        ...name,
    }
}