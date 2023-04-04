import { NextApiRequest, NextApiResponse } from "next";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // console.log(req)

        return res.status(200).json({ })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: e })
    }
}