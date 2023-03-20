import Head from 'next/head'
import { Inter } from 'next/font/google'
import { AreaChart, DonutChart, Legend } from "@tremor/react";
import { prisma } from '../../prisma/client';
import { Transaction } from '@prisma/client';

const inter = Inter({ subsets: ['latin'] })

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]
const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
      'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
      'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
]

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const citiesName = cities.map(item => item.name)


export const getStaticProps = async () => {
  const res = await prisma.transaction.findMany({})

  const transactions: any = []

  if (res)
    for (let i = 0; i < res?.length; i++) {
      const transaction = res[i]
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

      if (transaction.price) price = Number(transaction.price.toFixed(2))

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
      paymentTypes
    },
  }
}


export default function Home(props: any) {
  const { transactionByDay, transactionByPaymentType,paymentTypes } = props

  return (
    <>
      <Head>
        <title>Metrito</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Home</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
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
                    Compare sales percentage by product.
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
      </div>
    </>
  )
}

