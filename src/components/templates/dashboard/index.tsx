import MotionWrapper from "@/components/animation/motionWrapper"
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { AreaChart, DonutChart, Legend } from "@tremor/react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Dashboard(props: any) {
    const { pageName, transactionByDay, transactionByPaymentType, paymentTypes, table, tableCount } = props

    return (
        <>
            <MotionWrapper key={pageName}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="sr-only">{pageName}</h1>
                    <h1 className="sm:hidden text-xl text-white pb-5">{pageName}</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8 mb-10">
                        {/* Left column */}
                        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                            {/* Welcome panel */}
                            <section aria-labelledby="overview">
                                <div className="rounded-lg shadow-xl bg-white p-6 grid justify-items-start content-center gap-12">
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900" id="overview-title">
                                            Overview
                                        </h2>
                                        <p className='text-sm sm:text-base text-gray-700'>
                                            Below you can see the comparison of successfull and non-successfull sales over time.
                                        </p>
                                    </header>
                                    <AreaChart data={transactionByDay} index="date" categories={["Approved", "Cancelled"]} colors={["teal", "red"]}
                                        valueFormatter={(n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)} className="h-96" />
                                </div>
                            </section>
                        </div>

                        {/* Right column */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Announcements */}
                            <section aria-labelledby="details">
                                <div className="rounded-lg bg-white shadow-xl p-6 grid justify-items-start content-center gap-10">
                                    <header>
                                        <h2 className="text-lg sm:text-base font-medium text-gray-900" id="details-title">
                                            Details
                                        </h2>
                                        <p className='text-sm text-gray-700'>
                                            Compare sales percentage by payment method.
                                        </p>
                                    </header>
                                    <DonutChart
                                        className="mt-6 h-72"
                                        data={transactionByPaymentType}
                                        category="sales"
                                        index="type"
                                        variant='pie'
                                        valueFormatter={(n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)}
                                    />

                                    <Legend
                                        className="flex justify-center"
                                        categories={paymentTypes}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Activity list (smallest breakpoint only) */}
                    <div className="sm:hidden">
                        <h3 className='text-lg text-gray-800 font-semibold'>Records</h3>
                        <p className='text-sm text-gray-600 mb-5'>Track each transaction below.</p>
                        <ul
                            role="list"
                            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow-lg sm:hidden rounded-t-lg"
                        >
                            {table.map((transaction: any) => (
                                <motion.li key={transaction.id} layoutId={transaction.id}>
                                    <Link
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
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        {/* Pagination */}
                        <nav
                            className="bg-white px-4 py-3 grid place-items-center border-t border-gray-200 rounded-b-lg shadow-lg"
                            aria-label="Pagination"
                        >
                            <p className="text-sm text-center text-gray-700">
                                Showing <span className="font-medium">{tableCount}</span> to{" "}
                                <span className="font-medium">{tableCount}</span> of{" "}
                                <span className="font-medium">{tableCount}</span> results
                            </p>
                        </nav>
                    </div>

                    {/* Activity table (small breakpoint and up) */}
                    <div className="hidden sm:flex flex-col mt-2">
                        <h3 className='text-lg text-gray-800 font-semibold'>Records</h3>
                        <p className='text-sm text-gray-600 mb-5'>Track each transaction below.</p>
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
                                    {table.map((transaction: any) => (
                                        <tr key={transaction.id} className="bg-white">
                                            <td className=" w-full whitespace-nowrap text-sm text-gray-900">
                                                <Link href={transaction.href}>
                                                    <div className="flex  px-6 py-4 ">
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
                                                </Link>
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
                                        Showing <span className="font-medium">{tableCount}</span> to{" "}
                                        <span className="font-medium">{tableCount}</span> of{" "}
                                        <span className="font-medium">{tableCount}</span> results
                                    </p>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </MotionWrapper>
        </>
    )
}