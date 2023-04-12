import { ArrowTrendingUpIcon, CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Card from "../card";
import { useState, Fragment } from "react";
import Skeleton from "./skeleton";
import { Listbox, Transition } from '@headlessui/react'
import Link from "next/link";

const statuses = [
    { id: 1, name: 'Todas', status: "" },
    { id: 2, name: 'Ativas', status: "active" },
    { id: 3, name: 'Problemáticas', status: "alert" },
    { id: 4, name: 'Bloqueadas', status: "error" },
    { id: 5, name: 'Expiradas', status: "expired" },
]

export default function List({ connections, inlinePadding = "", handleAdd, loading, className = "" }: {
    connections: any[],
    inlinePadding?: string,
    handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    loading: boolean,
    className?: string
}) {

    const statusOrder = { "error": 1, "alert": 2, "active": 3, "expired": 4 };

    const sortByStatus = (arr: any[]) =>
        arr.sort((a, b) => {
            // @ts-ignore
            const aStatus = statusOrder[a.status];
            // @ts-ignore
            const bStatus = statusOrder[b.status];
            return aStatus - bStatus;
        });

    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")

    const filterBySearch = (arr: any[]) =>
        arr.filter((o) =>
            o.name
                .toLowerCase()
                .replace(/ /g, "")
                .includes(search.toLowerCase().replace(/ /g, ""))
        );

    const filterByStatus = (arr: any[]) => !status ? arr : arr.filter(o => o.status === status)

    const filteredConnections = filterBySearch(filterByStatus(sortByStatus(connections)))

    if (loading) return <Skeleton {...{ inlinePadding }} />

    if (connections.length === 0)
        return <div
            className={`p-0 w-full md:col-span-3 grid md:max-h-full relative transition-all ease-in ${className} ${inlinePadding} grid grid-cols-3 gap-4`}
        >
            <div
                className={`col-span-3 grid grid-cols-2 md:grid-cols-3 ${connections.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
            >

                <AddGrid {...{ handleAdd, connections }} />
                <Link href={"#"} className="text-right max-sm:max-w-[17rem] col-span-2 md:col-span-3 justify-self-end flex items-center justify-end gap-2 w-fit mr-0 md:hover:border-b md:hover:border-gray-600 transition-all ease-in text-gray-600 md:hover:text-gray-800 max-sm:hover:underline-offset-2 max-sm:hover:underline">
                    Veja como adicionar sua primeira conexão no Metrito
                    <ArrowTrendingUpIcon className="w-4 h-4 max-sm:self-end" />
                </Link>

            </div>

            <div className={`mt-10 col-span-3 md:col-span-3 md:mx-64 p-8 py-16 rounded-md bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer shadow-lg grid place-items-center gap-4 font-medium text-gray-600 hover:text-gray-700 transition-all ease-in`}>
                <ExclamationCircleIcon className="h-8 w-8" />
                <span>Ainda não adicionou uma conexão?</span>
            </div>
        </div>

    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in`}
        >
            {
                connections.length > 0 &&
                <header className={`grid grid-flow-col-dense max-sm:gap-2 gap-8 sm:flex sm:justify-between ${inlinePadding}`}>
                    <div className="w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2 flex items-center justify-between relative">
                        <div className="flex items-center relative">
                            <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 inset-y-auto pointer-events-none" />
                            <input type="text" id="name" value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Pesquise por nome"
                                className="block w-full sm:w-full border-0 py-1.5 pl-8 text-gray-900 bg-transparent placeholder:text-gray-400 focus:ring-transparent sm:text-sm sm:leading-6 max-sm:focus:border-b max-sm:focus:border-gray-300 rounded-none"
                            />
                        </div>

                        <Select {...{ selected: status, setSelected: setStatus }} />
                    </div>

                    <button onClick={(e) => handleAdd(e)} className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                        <PlusIcon className="h-4 w-4" />
                        <span className="hidden sm:block">Adicionar conexão</span>
                    </button>
                </header>
            }


            {
                filteredConnections.length <= 0 &&
                <div
                    className={`w-full py-8 text-center text-gray-500 font-medium ${inlinePadding}`}
                >
                    <span>Nenhum resultado{status ? `com o status "${statuses.filter(item => item.status === status)[0].name}"` : ""} para a pesquisa{search ? ` "${search}"` : ""}.</span>
                </div>
            }



            <div
                className={`w-full grid grid-cols-1 md:grid-cols-4 gap-4 ${inlinePadding}`}
            >

                {
                    filteredConnections.map(
                        item =>
                            <Card key={item.id} {...{ name: item.name, source: item.source, brandsCount: item.brandsCount, status: item.status }} />
                    )
                }

            </div>
        </div>
    )
}

function AddGrid({ connections, handleAdd }: { connections: any[], handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
    return (
        <div className={`${connections.length === 0 ? "col-span-2 md:col-span-3" : connections.length % 2 === 0 || connections.length % 3 === 0 ?
            connections.length % 2 === 0 && connections.length % 3 === 0 ?
                "max-sm:col-span-2 md:col-span-3"
                : connections.length % 2 === 0 ?
                    "max-sm:col-span-2"
                    : connections.length % 3 === 0 ?
                        "md:col-span-3"
                        : ""
            : ""
            }  grid shadow rounded-md backdrop-blur-md transition-all ease-in`}>
            <button key={"add-grid"} onClick={(e) => handleAdd(e)} className={`${connections.length % 2 === 0 ? "py-8 md:py-10 flex" : "py-16 md:py-20 grid"} px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 hover:border-gray-600  place-items-center md:flex justify-center items-center gap-2 transition-all ease-in group`} >
                <PlusIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600 group-hover:text-gray-800 drop-shadow-lg" />
                <h2 className="font-semibold text-base  sm:text-lg text-gray-600 group-hover:text-gray-800 text-center drop-shadow-lg">
                    {connections.length > 0 ? "Adicionar conexão" : "Adicione sua primeira conexão"}
                </h2>
            </button>
        </div>
    )
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export function Select({ selected, setSelected }: { selected: string, setSelected: React.Dispatch<React.SetStateAction<string>> }) {

    const itemSelected = statuses.filter(item => item.status === selected)[0]

    return (
        <Listbox value={selected} onChange={(e: any) => setSelected(e.status)}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">Filtrar por status</Listbox.Label>
                    <div className="relative">
                        <Listbox.Button className="relative w-full bg-transparent rounded-md pl-3 pr-10 py-2 text-left sm:text-sm">
                            <div className="flex items-center gap-2">
                                <span
                                    aria-label={itemSelected?.status}
                                    className={classNames(
                                        itemSelected?.status === "" ? 'bg-gradient-to-tr from-teal-500 via-amber-400 to-red-500' : itemSelected?.status === "active" ? 'bg-teal-500 shadow-teal-600/30' : itemSelected?.status === "alert" ? 'bg-amber-500 shadow-amber-600/30' : itemSelected?.status === "error" ? 'bg-red-500 shadow-red-600/30' : 'bg-gray-500',
                                        'flex-shrink-0 inline-block h-3 w-3 rounded-full shadow-md'
                                    )}
                                />
                                <span className="block truncate max-sm:hidden">{itemSelected?.name}</span>
                            </div>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-30 right-0 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {statuses.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                            classNames(
                                                !active ? "" : item.status === "" ? 'bg-gradient-to-tr from-teal-500/10 via-amber-400/10 to-red-500/10' : item.status === "active" ? 'bg-teal-500/10 shadow-teal-600/30' : item.status === "alert" ? 'bg-amber-500/10 shadow-amber-600/30' : item.status === "error" ? 'bg-red-500/10 shadow-red-600/30' : 'bg-gray-500/10',
                                                'cursor-pointer select-none relative py-2 pl-3 pr-9 transition-all ease-in'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={classNames(
                                                            active ? item.status === "" ? 'bg-gradient-to-tr from-teal-500 via-amber-400 to-red-500' : item.status === "active" ? 'bg-teal-500 shadow-teal-600/30' : item.status === "alert" ? 'bg-amber-500 shadow-amber-600/30' : item.status === "error" ? 'bg-red-500 shadow-red-600/30' : 'bg-gray-500' : item.status === "" ? 'bg-gradient-to-tr from-teal-500 via-amber-400 to-red-500' : item.status === "active" ? 'bg-teal-500 shadow-teal-600/30' : item.status === "alert" ? 'bg-amber-500 shadow-amber-600/30' : item.status === "error" ? 'bg-red-500 shadow-red-600/30' : 'bg-gray-500',
                                                            'flex-shrink-0 inline-block h-3 w-3 rounded-full shadow-md'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={classNames(item.status === "text-gray-800/50" ? '' : item.status === "active" ? 'text-teal-800/50' : item.status === "alert" ? 'text-amber-800/50' : item.status === "error" ? 'text-red-800/50' : 'text-gray-800/50', 'block truncate font-medium')}
                                                    >
                                                        {item.name}
                                                        <span className="sr-only"> is {item.status}</span>
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
