import { ArrowTrendingUpIcon, ExclamationCircleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Card from "../card";
import { useState } from "react";
import Skeleton from "./skeleton";
import Link from "next/link";

export default function List({ connections, inlinePadding= "", handleAdd, loading, className= "" }: {
    connections: any[],
    inlinePadding?: string,
    handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    loading: boolean,
    className?: string
}) {
    const [search, setSearch] = useState("")

    const filterBySearch = (arr: any[]) =>
        arr.filter((o) =>
            o.name
                .toLowerCase()
                .replace(/ /g, "")
                .includes(search.toLowerCase().replace(/ /g, ""))
        );

    const filteredConnections = filterBySearch(connections)

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
                <header className={`grid grid-flow-col-dense gap-8 sm:flex sm:justify-between ${inlinePadding}`}>
                    <div className="w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2 flex items-center relative">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 inset-y-auto pointer-events-none" />
                        <input type="text" id="name" value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Pesquise por nome"
                            className="block max-sm:col-span-2 sm:max-w-md sm:w-full border-0 py-1.5 pl-8 text-gray-900 bg-transparent placeholder:text-gray-400 focus:ring-transparent sm:text-sm sm:leading-6 max-sm:focus:border-b max-sm:focus:border-gray-300 rounded-none"
                        />
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
                    <span>Nenhum resultado para a pesquisa{search ? ` "${search}"` : ""}.</span>
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