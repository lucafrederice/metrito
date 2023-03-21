import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { prisma } from "../../prisma/client";


export const getStaticProps = async () => {

    const desc = await prisma.transaction.findMany({
        orderBy: {
            order_date: "desc"
        },
        include: {
            product: true,
        },
    })

    const count = await prisma.transaction.count({})


    const transactions = desc.map(
        transaction => {
            return {
                id: transaction.id,
                href: `/${transaction.id}`,
                name: transaction.product?.name,
                amount: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: transaction.currency || "BRL" }).format(Number(transaction.price?.toFixed(2))),
                currency: transaction.currency,
                status: transaction.status,
                date: transaction?.order_date?.toLocaleDateString(),
                datetime: transaction?.order_date?.toISOString()
            }
        }
    )


    return {
        props: {
            transactions,
            count
        }
    }
}

export default function Test(props: any) {
    const { transactions, count } = props

    return (
        <>

            {/* Activity list (smallest breakpoint only) */}
            <div className="sm:hidden">
                <ul
                    role="list"
                    className="mt-2 divide-y divide-gray-200 overflow-hidden shadow-lg sm:hidden rounded-t-lg"
                >
                    {transactions.map((transaction: any) => (
                        <li key={transaction.id}>
                            <a
                                href={transaction.href}
                                className="block px-4 py-4 bg-white hover:bg-gray-50"
                            >
                                <span className="flex items-center space-x-4">
                                    <span className="flex-1 flex space-x-2 truncate">
                                        <BanknotesIcon
                                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <span className="flex flex-col text-gray-500 text-sm truncate">
                                            <span className="truncate">
                                                {transaction.name}
                                            </span>
                                            <span>
                                                <span className="text-gray-900 font-medium">
                                                    {transaction.amount}
                                                </span>{" "}
                                                {transaction.currency}
                                            </span>
                                            <time dateTime={transaction.datetime}>
                                                {transaction.date}
                                            </time>
                                        </span>
                                    </span>
                                    <span
                                        className={`${transaction.status === "COMPLETE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] capitalize font-medium`}
                                    >
                                        {transaction.status}
                                    </span>
                                    <ChevronRightIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
                {/* Pagination */}
                <nav
                    className="bg-white px-4 py-3 grid place-items-center border-t border-gray-200 rounded-b-lg shadow-lg"
                    aria-label="Pagination"
                >
                    <p className="text-sm text-center text-gray-700">
                        Showing <span className="font-medium">{count}</span> to{" "}
                        <span className="font-medium">{count}</span> of{" "}
                        <span className="font-medium">{count}</span> results
                    </p>
                </nav>
            </div>

            {/* Activity table (small breakpoint and up) */}
            <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transactions
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((transaction: any) => (
                                        <tr key={transaction.id} className="bg-white">
                                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex">
                                                    <a
                                                        href={transaction.href}
                                                        className="group inline-flex space-x-2 truncate text-sm"
                                                    >
                                                        <BanknotesIcon
                                                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                            {transaction.name}
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <span className="text-gray-900 font-medium">
                                                    {transaction.amount}{" "}
                                                </span>
                                                {transaction.currency}
                                            </td>
                                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                                <span
                                                    className={`${transaction.status === "COMPLETE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <time dateTime={transaction.datetime}>
                                                    {transaction.date}
                                                </time>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <nav
                                className="bg-white px-4 py-3 grid place-items-center border-t border-gray-200 sm:px-6"
                                aria-label="Pagination"
                            >
                                <div className="hidden sm:block">
                                    <p className="text-sm text-center text-gray-700">
                                        Showing <span className="font-medium">{count}</span> to{" "}
                                        <span className="font-medium">{count}</span> of{" "}
                                        <span className="font-medium">{count}</span> results
                                    </p>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}