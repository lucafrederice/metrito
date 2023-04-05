import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function MobileBurger() {
    return (


        <Popover as="header" className="bg-gray-50 ">
            {({ open }) => (
                <>


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
                                            <Link
                                                href={"#"}
                                                className="block rounded-md px-3 py-2 text-base text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-800"
                                            >
                                                Item.name
                                            </Link>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition.Child>
                        </div>
                    </Transition.Root>
                </>
            )}
        </Popover>
    )
}