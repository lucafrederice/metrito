import MotionWrapper from "@/components/animation/motionWrapper";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const data = {
    connections: [
        {
            id: 1,
            name: "Arezzo",
            source: "facebook ads",
            status: "error",
            brandsCount: 1
        }, {
            id: 2,
            name: "iFood",
            source: "google analytics",
            status: "error",
            brandsCount: 2
        }, {
            id: 3,
            name: "Zé Delivery",
            source: "google ads",
            status: "error",
            brandsCount: 0
        },
        {
            id: 4,
            name: "Paulo Muzy",
            source: "facebook",
            status: "alert",
            brandsCount: 2
        }, {
            id: 5,
            name: "onovomercado",
            source: "tiktok ads",
            status: "alert",
            brandsCount: 5
        }, {
            id: 6,
            name: "uol",
            source: "linkedin ads",
            status: "alert",
            brandsCount: 4
        },
        {
            id: 7,
            name: "Santos FC",
            source: "hotmart",
            status: "active",
            brandsCount: 5
        }, {
            id: 8,
            name: "Brechó da Ana",
            source: "google ads",
            status: "active",
            brandsCount: 3
        }, {
            id: 9,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "active",
            brandsCount: 0
        }, {
            id: 10,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "active",
            brandsCount: 1
        }, {
            id: 11,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "active",
            brandsCount: 1
        }, {
            id: 12,
            name: "Bar da rosa",
            source: "monetizze",
            status: "active",
            brandsCount: 2
        }, {
            id: 13,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "expired",
            brandsCount: 0
        }, {
            id: 14,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "expired",
            brandsCount: 1
        }, {
            id: 15,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "expired",
            brandsCount: 1
        }, {
            id: 16,
            name: "Bar da rosa",
            source: "monetizze",
            status: "expired",
            brandsCount: 2
        },
    ]
}

export default function Index() {

    const [search, setSearch] = useState("")

    const filterBySearch = (arr: any[]) =>
        arr.filter((o) =>
            o.name
                .toLowerCase()
                .replace(/ /g, "")
                .includes(search.toLowerCase().replace(/ /g, ""))
        );

    const filteredConnections = filterBySearch(data.connections)

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { }

    const inlinePadding = "max-sm:px-4"

    return (
        <MotionWrapper>
            <div key="workspace-connections" className="max-w-7xl mx-auto min-h-screen py-10 w-full grid place-items-center auto-rows-min gap-4">
                <div
                    className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in`}
                >
                    {
                        data.connections.length > 0 &&
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
                                    <div key={item.id}
                                        className={`bg-white rounded-md shadow-lg px-8 py-6 grid grid-cols-3 grid-rows-2 grid-flow-col-dense gap-x-2 gap-y-1 border ${item.status === "active" ? "border-teal-300 shadow-teal-800/10" : item.status === "alert" ? "border-amber-300 shadow-amber-800/10" : item.status === "error" ? "border-red-300 shadow-red-800/10" : "border-gray-300 shadow-gray-800/10"}`}
                                    >
                                        <div className={`col-span-2 text-lg font-medium justify-self-start self-end w-full truncate ${item.status === "active" ? "text-teal-600" : item.status === "alert" ? "text-amber-600" : item.status === "error" ? "text-red-600" : "text-gray-600"}`}>
                                            {item.name}
                                        </div>

                                        <div className={`capitalize col-span-2 text-xs text-teal-800/70 font-semibold justify-self-start self-start ${item.status === "active" ? "text-teal-900/60" : item.status === "alert" ? "text-amber-900/60" : item.status === "error" ? "text-red-900/60" : "text-gray-900/60"}`}>{item.source}</div>

                                        <div className={`h-2.5 w-2.5 rounded-full shadow-md justify-self-end self-start ${item.status === "active" ? "bg-teal-500 shadow-teal-500/50" : item.status === "alert" ? "bg-amber-500 shadow-amber-500/50 " : item.status === "error" ? "bg-red-500 shadow-red-500/50" : "bg-gray-500 shadow-gray-500/50"}`} />

                                        <div className={`text-sm font-medium justify-self-end self-end flex items-center justify-end gap-2 ${item.status === "active" ? "text-teal-900/40" : item.status === "alert" ? "text-amber-900/40" : item.status === "error" ? "text-red-900/40" : "text-gray-900/40"}`}>
                                            <CircleStackIcon className="h-4 w-4" />
                                            <span>{item.brandsCount}</span>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </MotionWrapper>
    )
}