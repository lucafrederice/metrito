import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
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
    CircleStackIcon,
    ChartPieIcon,
    RectangleStackIcon,
    UserGroupIcon,
    ArrowsPointingOutIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ChevronDownIcon,
    ArrowSmallRightIcon,
    ArrowSmallLeftIcon
} from '@heroicons/react/24/outline'
import { ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import useAxios from '@/hooks/useAxios'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'
import Icon from '../logo'

const navigation = [
    { name: 'Home', href: '#', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {

    const [response] = useAxios("/api/products");
    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: false }
    ])
    const scrollRef = useRef<HTMLDivElement>(null)
    const [startScroll, setStartScroll] = useState(false)
    const [endScroll, setEndScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current && scrollRef.current.scrollLeft > 0)
                setStartScroll(false);
            if (scrollRef.current && scrollRef.current.scrollLeft <= 0)
                setStartScroll(true);
            if (scrollRef.current && Math.ceil(scrollRef.current.scrollLeft + globalThis.window.innerWidth) >= scrollRef.current.scrollWidth - 15)
                setEndScroll(true);
            if (scrollRef.current && Math.ceil(scrollRef.current.scrollLeft + globalThis.window.innerWidth) < scrollRef.current.scrollWidth - 15)
                setEndScroll(false);
        };

        scrollRef.current?.addEventListener("scroll", handleScroll);

        return () => {
            scrollRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, [scrollRef?.current?.scrollLeft]);

    useEffect(
        () => {
            if (response) setNavigation(
                prev => [
                    ...prev,
                    //@ts-ignore
                    ...response.products.map(
                        (item: Product) => {
                            return {
                                name: item.name,
                                href: `/product/${item.id}`,
                                current: globalThis.window.location.pathname === `/product/${item.id}`
                            }
                        }
                    )
                ]
            )
        },
        [response]
    )

    useEffect(
        () => {
            setNavigation(
                prev => [
                    ...prev.map(
                        nav => {
                            return {
                                name: nav.name,
                                href: nav.href,
                                current: globalThis.window.location.pathname === nav.href
                            }
                        }
                    )
                ]
            )
        },
        [globalThis?.window?.location?.pathname]
    )

    return (
        <>
            <div className="min-h-full">
                <Popover as="header" className="bg-gray-50 border-b border-gray-300">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto w-full">
                                <div className=" flex items-center sm:items-center justify-between lg:justify-between py-2 sm:py-0 px-2 sm:px-0 sm:justify-center">
                                    {/* Logo */}
                                    <div className="">
                                        {/* <Link href="/" className='max-w-sm'>
                                            <span className="sr-only">Metrito</span>
                                            <Image priority alt={"Metrito"} src={"/logo.svg"} width={150} height={50} style={{
                                                height: "auto"
                                            }} />
                                        </Link> */}

                                        <div className='w-full h-full py-4 px-2 flex items-center gap-1 sm:gap-2 '>
                                            <Link
                                                href={'#'}
                                                className='cursor-pointer grid justify-items-center content-center bg-black bg-opacity-0 hover:bg-opacity-10 px-0 sm:px-1 py-0 sm:py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500'
                                            >
                                                <Icon
                                                    className="w-9 h-9 fill-gray-700 "
                                                // src="/logo-xs_1.svg"
                                                // alt=""
                                                />
                                            </Link>
                                            <div className="grid place-items-center">
                                                <ChevronRightIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                            </div>

                                            <Menu as="div" className="relative inline-block text-left max-w-[160px] sm:w-fit sm:max-w-xs">
                                                <div>
                                                    <span className="flex w-full justify-between items-center gap-1">
                                                        <Link href="#" className="hover:bg-gray-200 px-0 sm:px-1 py-0 sm:py-1 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                            <img
                                                                className="w-8 h-8 bg-gray-300 rounded flex-shrink-0"
                                                                src="/v4.png"
                                                                alt=""
                                                            />
                                                            <span className="flex-1 flex flex-col min-w-0">
                                                                <span className="text-gray-900 text-sm font-medium tracking-wide truncate">V4 Company</span>
                                                            </span>
                                                        </Link>
                                                        <Menu.Button className="self-stretch px-1 rounded-md transition-all ease-in  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                            <ChevronUpDownIcon
                                                                className="flex-shrink-0 h-5 w-5 text-gray-600"
                                                                aria-hidden="true"
                                                            />
                                                        </Menu.Button>
                                                    </span>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View profile
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Settings
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Notifications
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Get desktop app
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Support
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                            <div className="hidden sm:grid place-items-center">
                                                <ChevronRightIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                            </div>

                                            <Menu as="div" className="hidden relative sm:inline-block text-left max-w-[160px] sm:w-fit sm:max-w-xs">
                                                <div>
                                                    <span className="flex w-full justify-between items-center gap-1">
                                                        <Link href="#" className="cursor-pointer hover:bg-gray-200 px-0 sm:px-1 py-0 sm:py-1 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">

                                                            <span className="flex-1 flex flex-col min-w-0">
                                                                <span className="text-gray-900 text-sm font-medium tracking-wide truncate">Ifood</span>
                                                            </span>
                                                        </Link>
                                                        <Menu.Button className="self-stretch px-1 rounded-md transition-all ease-in  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                            <ChevronUpDownIcon
                                                                className="flex-shrink-0 h-5 w-5 text-gray-600"
                                                                aria-hidden="true"
                                                            />
                                                        </Menu.Button>
                                                    </span>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View profile
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Settings
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Notifications
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Get desktop app
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Support
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>


                                    {/* Menu button */}
                                    <div className="flex justify-end gap-2 sm:gap-1 overflow-visible">

                                        <Link
                                            href="#"
                                            className="text-sm text-gray-600 font-medium rounded-md px-1 sm:px-2 sm:py-2 bg-black bg-opacity-0 hover:bg-opacity-10  justify-between items-center gap-2 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                        >
                                            <ArrowsPointingOutIcon className='w-5 h-5' />
                                        </Link>

                                        <Link
                                            href="#"
                                            className="text-sm text-gray-600 font-medium rounded-md px-1 sm:px-2 sm:py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                        >
                                            <BellIcon className='w-5 h-5' />
                                        </Link>



                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative inline-block text-left sm:w-fit sm:max-w-[12rem]">
                                            <Menu.Button className="flex w-full justify-between items-center gap-0 sm:hover:bg-gray-200 px-0 sm:px-1 py-0 sm:py-1 rounded-full sm:rounded-md min-w-0 space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                <span className="hidden lg:block text-gray-700 text-sm font-medium truncate">
                                                    <span className="sr-only">Open user menu for </span>
                                                    Emilia Birch Truncate ASDFASDf
                                                </span>
                                                <ChevronDownIcon
                                                    className="hidden flex-shrink-0 h-4 w-4 text-gray-400 lg:block"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Logout
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                        {/* Mobile menu button */}
                                        <Popover.Button
                                            className=" hidden text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 sm:flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>


                                <div className="relative">
                                    <div ref={scrollRef} className='w-full py-2 px-2 sm:px-0 overflow-x-scroll sm:overflow-visible'>
                                        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                                            {/* Left nav */}
                                            <div className="lg:col-span-2">
                                                <nav className="flex items-center space-x-4">
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                    >
                                                        <ChartBarIcon className='w-4 h-4' />
                                                        Overview
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                    >
                                                        <RectangleStackIcon className='w-4 h-4' />
                                                        Projetos
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                    >
                                                        <CircleStackIcon className='w-4 h-4' />
                                                        Conexões
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                    >
                                                        <UserGroupIcon className='w-4 h-4' />
                                                        Membros
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-gray-600 font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                    >
                                                        <Cog6ToothIcon className='w-4 h-4' />
                                                        Configurações
                                                    </Link>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`${startScroll ? "hidden" : ""} sm:hidden absolute w-8 inset-y-0 left-0 grid place-items-center bg-gradient-to-l from-transparent to-gray-200`}
                                    >
                                        <ArrowSmallLeftIcon className='w-4 h-4 text-gray-700 animate-pulse' />
                                    </div>
                                    <div
                                        className={`${endScroll ? "hidden" : ""} sm:hidden absolute w-8 inset-y-0 right-0 grid place-items-center bg-gradient-to-r from-transparent to-gray-200`}
                                    >
                                        <ArrowSmallRightIcon className='w-4 h-4 text-gray-700 animate-pulse' />
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
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block rounded-md px-3 py-2 text-base text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            {item.name}
                                                        </Link>
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
                <main className="pb-8">
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