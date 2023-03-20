import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"
import { prisma } from "../../../prisma/client";
import { Commission, getCachedToken, History, SalesParticipants, tokenIsExpired, URL } from "../../../prisma/resources";
import seed from "../../../prisma/seed";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getCachedToken()
    if (token && tokenIsExpired(token)) seed()

    res.status(200).json({ msg: "asap" })
}