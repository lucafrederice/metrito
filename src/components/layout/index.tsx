import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    AcademicCapIcon,
    CheckBadgeIcon,
    BellIcon,
    BanknotesIcon,
    ClockIcon,
    Bars3Icon,
    ReceiptRefundIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Profile', href: '#', current: false },
    { name: 'Resources', href: '#', current: false },
    { name: 'Company Directory', href: '#', current: false },
    { name: 'Openings', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-full">
                <Popover as="header" className="pb-24 bg-gradient-to-r from-blue-600 to-blue-500">
                    {({ open }) => (
                        <>
                            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-10 md:py-0">
                                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                                    {/* Logo */}
                                    <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                                        <a href="#" className='max-w-sm'>
                                            <span className="sr-only">Metrito</span>
                                            <Image alt={"Metrito"} src={"/logo.svg"} width={150} height={50} />
                                        </a>
                                    </div>

                                    <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                                        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                                            {/* Left nav */}
                                            <div className="hidden lg:block lg:col-span-2">
                                                <nav className="flex space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-cyan-100',
                                                                'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu button */}
                                    <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                        {/* Mobile menu button */}
                                        <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>

                            <Transition.Root as={Fragment}>
                                <div className="lg:hidden">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>

                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-150 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full transition transform origin-top"
                                        >


                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200 pb-4">

                                                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-10 md:py-0">
                                                    <div className="relative py-5 flex flex-wrap items-center justify-center lg:justify-between">
                                                        {/* Logo */}
                                                        <div className="absolute w-full left-0 py-5 flex-shrink-0 lg:static">
                                                            <a href="#" className='max-w-sm'>
                                                                <span className="sr-only">Metrito</span>
                                                                <Image alt={"Metrito"} src={"/logo-blue.svg"} width={150} height={50} />
                                                            </a>
                                                        </div>


                                                        {/* Menu button */}
                                                        <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                                            {/* Mobile menu button */}
                                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                                                <span className="sr-only">Open main menu</span>
                                                                {open ? (
                                                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                                                ) : (
                                                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                                                )}
                                                            </Popover.Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 px-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition.Child>
                                </div>
                            </Transition.Root>
                        </>
                    )}
                </Popover>
                <main className="-mt-24 pb-8">
                    {children}
                </main>
                <footer>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center">
                            <span className="block sm:inline">&copy; 2023 Metrito.</span>{' '}
                            <span className="block sm:inline">All rights reserved.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}