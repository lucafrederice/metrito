import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const products = await prisma.product.findMany({})
        return res.status(200).json({products})
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: e })
    }
}