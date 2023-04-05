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
    ArrowSmallLeftIcon,
    TableCellsIcon,
    ArrowTrendingUpIcon,
    RectangleGroupIcon,
    PlusIcon
} from '@heroicons/react/24/outline'
import { ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import useAxios from '@/hooks/useAxios'
import Link from 'next/link'
import { Product } from '@prisma/client'
import Icon from '../logo'
import Metrito from '../metrito'
import { useRouter } from 'next/router'

const WorkspaceNavigation = [
    { id: 1001, name: 'Overview', href: '', Icon: (props: any) => <ChartBarIcon {...props} /> },
    { id: 1002, name: 'Projetos', href: 'brands', Icon: (props: any) => <RectangleStackIcon {...props} /> },
    { id: 1003, name: 'Conexões', href: 'connections', Icon: (props: any) => <CircleStackIcon {...props} /> },
    { id: 1004, name: 'Membros', href: 'members', Icon: (props: any) => <UserGroupIcon {...props} /> },
    { id: 1005, name: 'Configurações', href: 'settings', Icon: (props: any) => <Cog6ToothIcon {...props} /> },
]

const BrandNavigation = [
    { id: 2001, name: 'Overview', href: '', Icon: (props: any) => <ChartBarIcon {...props} /> },
    {
        id: 2002, name: 'Dashboards', href: 'dashboards', Icon: (props: any) =>
            <TableCellsIcon {...props} />
        // <RectangleGroupIcon {...props} />
    },
    { id: 2003, name: 'Painel de Vendas', href: 'sales-panel', Icon: (props: any) => <ArrowTrendingUpIcon {...props} /> },
    { id: 2004, name: 'Conexões', href: 'connections', Icon: (props: any) => <CircleStackIcon {...props} /> },
    { id: 2005, name: 'Membros', href: 'members', Icon: (props: any) => <UserGroupIcon {...props} /> },
    { id: 2006, name: 'Configurações', href: 'settings', Icon: (props: any) => <Cog6ToothIcon {...props} /> },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    const [response] = useAxios("/api/products");
    const [navigation, setNavigation] = useState("")

    useEffect(() => {
        if (router.isReady) {
            if (router.query.workspace) {

                if (router.query.brand)
                    setNavigation("brand")

                if (!router.query.brand)
                    setNavigation("workspace")

            }

            if (!router.query.workspace) {
                setNavigation("")
            }
        }
    }, [router.query.brand, router.query.workspace])

    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollAvailable, setScrollAvailable] = useState(false)
    const [startScroll, setStartScroll] = useState(false)
    const [endScroll, setEndScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current && scrollRef.current.scrollWidth > globalThis.window.innerWidth)
                setScrollAvailable(true)
            if (scrollRef.current && scrollRef.current.scrollWidth <= globalThis.window.innerWidth)
                setScrollAvailable(false)
            if (scrollRef.current && scrollRef.current.scrollLeft > 0)
                setStartScroll(false);
            if (scrollRef.current && scrollRef.current.scrollLeft <= 0)
                setStartScroll(true);
            if (scrollRef.current && Math.ceil(scrollRef.current.scrollLeft + globalThis.window.innerWidth) >= scrollRef.current.scrollWidth - 15)
                setEndScroll(true);
            if (scrollRef.current && Math.ceil(scrollRef.current.scrollLeft + globalThis.window.innerWidth) < scrollRef.current.scrollWidth - 15)
                setEndScroll(false);
        };

        handleScroll()

        scrollRef.current?.addEventListener("scroll", handleScroll);

        return () => {
            scrollRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, [navigation]);

    const navbarRef = useRef<HTMLDivElement>(null)
    const [navbarShadow, setNavbarShadow] = useState<boolean>()

    useEffect(
        () => {

            const handleScroll = () => {
                if (navbarRef.current && navbarRef.current.getBoundingClientRect()?.top === 0)
                    setNavbarShadow(true)
                if (navbarRef.current && navbarRef.current.getBoundingClientRect()?.top > 0)
                    setNavbarShadow(false)
            };

            handleScroll()

            globalThis?.window?.addEventListener("scroll", handleScroll);

            return () => {
                globalThis?.window?.removeEventListener("scroll", handleScroll);
            };
        },
        []
    )



    return (
        <>
            <div className="min-h-full relative  ">
                <div className='absolute -z-10 w-full h-[30rem] md:h-[28rem] bg-gray-50 shadow-md' />

                <div className='w-full bg-gray-50'>
                    <div className="max-w-7xl mx-auto w-full ">
                        <div className={`grid grid-cols-2 ${navigation === "" ? "grid-rows-1" : "grid-rows-2"} sm:flex sm:justify-start py-2 sm:py-0 px-2 sm:px-0`}>
                            {/* Logo */}
                            <div className="col-start-1 row-start-1">
                                <div className='w-full h-full py-4 px-2 flex items-center gap-1 sm:gap-2 '>
                                    <Link
                                        href={'/'}
                                        onClick={() => setNavigation("")}
                                        className='cursor-pointer grid justify-items-center content-center bg-black bg-opacity-0 hover:bg-opacity-10 px-0 sm:px-1 py-0 sm:py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500'
                                    >
                                        {/* <Icon
                                        className="md:hidden w-9 h-9 fill-gray-700 "
                                    /> */}
                                        <Metrito
                                            className="block w-32 h-9 fill-gray-700 "
                                        />
                                    </Link>
                                    {
                                        router.query?.workspace &&
                                        <div className="hidden sm:block place-items-center">
                                            <ChevronRightIcon className="h-6 w-6 text-gray-300" aria-hidden="true" />
                                        </div>
                                    }
                                </div>
                            </div>

                            {
                                navigation !== "" &&
                                <div className="row-start-2 col-span-2 sm:row-start-1 sm:col-span-1 ">
                                    <div className='w-full h-full py-4 px-2 flex items-center gap-1 sm:gap-2 '>
                                        {
                                            router.query?.workspace &&
                                            <>
                                                <Menu as="div" className="relative inline-block text-left max-w-[11rem] sm:w-fit sm:max-w-[13rem]">
                                                    <div>
                                                        <span className="flex w-full justify-between items-center gap-1">
                                                            <Link
                                                                href="/workspaces/workspace"
                                                                onClick={() => setNavigation("workspace")}
                                                                className="hover:bg-gray-200 px-0 sm:px-1 py-0 sm:py-1 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
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
                                                        <Menu.Items className="z-10 min-w-[13rem] sm:min-w-[15rem] origin-top absolute right-0 left-0 mt-1 rounded-md shadow-2xl bg-gray-100 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                                            <div className="grid gap-3 py-1 px-1 max-h-64 overflow-y-scroll">
                                                                {
                                                                    [1, 2, 3, 4, 2, 234, 34, 3, 3, 4, 34, 3, 4, 34, 3, 3, 43, 3, 34, 34, 34].map(
                                                                        (item, i) =>
                                                                            <Menu.Item key={i}>
                                                                                <Link
                                                                                    href={`/workspaces/${i}`}
                                                                                    onClick={() => setNavigation("workspace")}
                                                                                    className="hover:bg-gray-200 px-3 py-2 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                                    <img
                                                                                        className="w-7 h-7 bg-gray-300 rounded flex-shrink-0"
                                                                                        src="/v4.png"
                                                                                        alt=""
                                                                                    />
                                                                                    <span className="flex-1 flex flex-col min-w-0">
                                                                                        <span className="text-gray-500 text-xs font-medium truncate">V4 Company</span>
                                                                                    </span>
                                                                                </Link>
                                                                            </Menu.Item>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="bg-white rounded-b-md grid gap-1 pt-1 ">
                                                                <Menu.Item>
                                                                    <Link
                                                                        href="#"
                                                                        className={'text-gray-700 font-medium flex flex-row items-center gap-2 px-4 py-4 text-xs hover:bg-gray-100'}
                                                                    >
                                                                        <PlusIcon className='h-5 w-5' />
                                                                        Criar Workspace
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    <Link
                                                                        href="#"
                                                                        className={'text-gray-700 font-medium flex flex-row items-center gap-2 px-4 py-4 text-xs hover:bg-gray-100 rounded-b-md'}
                                                                    >
                                                                        <Cog6ToothIcon className='h-5 w-5' />
                                                                        Gerenciar Workspaces
                                                                    </Link>
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>

                                                <div className="grid place-items-center">
                                                    <ChevronRightIcon className="h-6 w-6 text-gray-300" aria-hidden="true" />
                                                </div>
                                            </>
                                        }

                                        {
                                            router.query?.brand &&
                                            <Menu as="div" className="relative inline-block text-left max-w-[11rem] sm:w-fit sm:max-w-[13rem]">
                                                <div>
                                                    <span className="flex w-full justify-between items-center gap-1">
                                                        <Link
                                                            href="/workspaces/workspace/brands/brand"
                                                            onClick={() => setNavigation("brand")}
                                                            className="cursor-pointer hover:bg-gray-200 px-1 sm:px-2 py-2 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                        >

                                                            <span className="flex-1 flex flex-col min-w-0">
                                                                <span className="text-gray-900 text-sm font-medium tracking-wide truncate">Ifood</span>
                                                            </span>
                                                        </Link>
                                                        <Menu.Button className="self-stretch px-1 sm:px-2 py-2 sm:py-2 rounded-md transition-all ease-in  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
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
                                                    <Menu.Items className="z-10 min-w-[11rem] sm:min-w-[13rem] absolute right-0 mt-1 rounded-md shadow-2xl bg-gray-100 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                                        <div className="grid gap-3 py-1 px-1 max-h-64 overflow-y-scroll">
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Disney</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Coca Cola</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">McDonald&apos;s</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    onClick={() => setNavigation("workspace")}
                                                                    className="hover:bg-gray-200 px-4 py-4 sm:py-2 rounded-md flex min-w-0 items-center justify-between space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                                    <span className="text-gray-700 text-sm truncate">Consultoria</span>
                                                                </Link>
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="bg-white rounded-b-md grid gap-1 pt-1 ">
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    className={'text-gray-700 font-medium flex flex-row items-center gap-2 px-4 py-4 text-xs hover:bg-gray-100'}
                                                                >
                                                                    <PlusIcon className='h-5 w-5' />
                                                                    Criar Projeto
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link
                                                                    href="#"
                                                                    className={'text-gray-700 font-medium flex flex-row items-center gap-2 px-4 py-4 text-xs hover:bg-gray-100 rounded-b-md'}
                                                                >
                                                                    <Cog6ToothIcon className='h-5 w-5' />
                                                                    Gerenciar Projetos
                                                                </Link>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        }

                                    </div>
                                </div>
                            }


                            {/* Menu button */}
                            <div className="place-self-end sm:place-self-center sm:flex-1 w-fit h-full flex justify-end items-center gap-2 sm:gap-3">


                                <Link
                                    href="#"
                                    className="text-sm text-gray-600 font-medium rounded-md px-1 sm:px-2 py-2 sm:py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
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


                                <Link
                                    href="#"
                                    className="text-sm text-gray-600 font-medium rounded-md px-1 sm:px-2 sm:py-2 bg-black bg-opacity-0 hover:bg-opacity-10  justify-between items-center gap-2 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                >
                                    <ArrowsPointingOutIcon className='w-5 h-5' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    navigation &&
                    (
                        <div ref={navbarRef} className={`${navbarShadow ? "shadow-lg" : ""} transition-all ease duration-300 sticky top-0 w-full bg-gray-50`}>
                            <div className="relative max-w-7xl mx-auto w-full border-b border-gray-300 ">
                                <div ref={scrollRef} className='w-full py-2 px-2 sm:px-0 overflow-x-scroll md:overflow-visible'>
                                    <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                                        {/* Left nav */}
                                        <div className="lg:col-span-2">
                                            <nav className="flex items-center space-x-4">
                                                {
                                                    navigation === "workspace" ?
                                                        WorkspaceNavigation.map(
                                                            item => (
                                                                <Link
                                                                    key={item.id}
                                                                    href={`/workspaces/workspace/${item.href}`}
                                                                    className="text-sm text-gray-500 whitespace-nowrap font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                                >
                                                                    <item.Icon className='w-4 h-4' />
                                                                    {item.name}
                                                                </Link>
                                                            )
                                                        )
                                                        :
                                                        navigation === "brand" ?
                                                            BrandNavigation.map(
                                                                item => (
                                                                    <Link
                                                                        key={item.id}
                                                                        href={`/workspaces/workspace/brands/brand/${item.href}`}
                                                                        className="text-sm text-gray-500 whitespace-nowrap font-medium rounded-md px-3 py-2 bg-black bg-opacity-0 hover:bg-opacity-10 flex justify-between items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                                    >
                                                                        <item.Icon className='w-4 h-4' />
                                                                        {item.name}
                                                                    </Link>
                                                                )
                                                            )
                                                            : ""
                                                }
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                {
                                    scrollAvailable && (
                                        <>
                                            <div
                                                className={`${startScroll ? "opacity-0 pointer-events-none" : ""}  absolute w-8 inset-y-0 left-1 grid place-items-center bg-gradient-to-l from-transparent to-gray-100 ease-in-out transition-all duration-300`}
                                            >
                                                <div
                                                    className='grid place-items-center p-1 rounded-full bg-white shadow-md'
                                                >
                                                    <ArrowSmallLeftIcon className='w-5 h-5 text-gray-700 animate-pulse' />

                                                </div>
                                            </div>
                                            <div
                                                className={`${endScroll ? "opacity-0 pointer-events-none" : ""} absolute w-8 inset-y-0 right-1 grid place-items-center bg-gradient-to-r from-transparent to-gray-100 ease-in-out transition-all duration-300`}
                                            >
                                                <div
                                                    className='grid place-items-center p-1 rounded-full bg-white shadow-md'
                                                >
                                                    <ArrowSmallRightIcon className='w-5 h-5 text-gray-700 animate-pulse' />

                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

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