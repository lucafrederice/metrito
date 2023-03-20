import { prisma } from "./client"

export default function reset() {
    const resetTrans = prisma.transaction.deleteMany({})
    const resetUsers = prisma.user.deleteMany({})
    const resetProducts = prisma.product.deleteMany({})
    const resetCommissions = prisma.commission.deleteMany({})
    const resetAddress = prisma.address.deleteMany({})
    const resetDocuments = prisma.document.deleteMany({})
}