import getProduct from "@/utils/getProduct";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { query: { id: ids } } = req

        const length = ids?.length || 0

        let data: any[] = []

        if (!length)
            data = [await getProduct()]

        if (Array.isArray(ids) && length)
            data = await Promise.all(ids?.map(
                async (id: string) => ({
                    ...(await getProduct(id))
                })
            ))

        return res.status(200).json({
            data
        })
    }
    catch (e) {
        return res.status(400).json({ error: e })
    }
}