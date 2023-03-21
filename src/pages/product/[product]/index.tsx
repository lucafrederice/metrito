import { Product as ProductType, Transaction } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
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

    const res = await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            transactions: true
        }
    })

    const product: any = {
        ...res,
        transactions: []
    }

    if (res)
        for (let i = 0; i < res?.transactions?.length; i++) {
            const transaction = res.transactions[i]
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

            if (transaction.price) price = transaction.price.toFixed(2)

            if (transaction.hotmart_fee_total) hotmart_fee_total = transaction.hotmart_fee_total.toFixed(2)
            if (transaction.hotmart_fee_fixed) hotmart_fee_fixed = transaction.hotmart_fee_fixed.toFixed(2)
            if (transaction.hotmart_fee_base) hotmart_fee_base = transaction.hotmart_fee_base.toFixed(2)

            product.transactions.push({
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


    return {
        props: {
            product
        },
    }
}


export default function Product({ product }: {
    product: ProductType & {
        transactions: Transaction[]
    }
}) {
    return (<>hello</>)
}
