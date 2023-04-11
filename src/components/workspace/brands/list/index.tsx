import { ArrowTrendingUpIcon, ChevronDownIcon, ChevronUpIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo, useRef, useState } from "react"
import WorkspaceCard from "@/components/workspace/brands/card"
import { SharedBrandsType, WorkspacesType } from "@/pages"
import Skeleton from "@/components/workspace/brands/list/skeleton"
import Link from "next/link"
import { ExclamationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useBgOverlay } from "@/contexts/bgOverlay.context"
import BrandCard from "@/components/workspace/brands/card"

export default function List({ brands, handleAdd, data, className = "", inlinePadding = "", loading }: {
    handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    data: {
        brands: SharedBrandsType,
    },
    brands: number[] | [],
    className?: string,
    inlinePadding?: string,
    loading: boolean
}) {

    const [search, setSearch] = useState("")

    const filterBySearch = (arr: SharedBrandsType) =>
        arr.filter((o) =>
            o.name
                .toLowerCase()
                .replace(/ /g, "")
                .includes(search.toLowerCase().replace(/ /g, ""))
        );

    const needsOverflow = useMemo(
        () => brands.length > 4 ? true : false,
        [brands]
    )

    const toggleBrands = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsBrandsOpen(state => !state)
    }

    const [isBrandsOpen, setIsBrandsOpen] = useState<boolean>(false)

    const { size: bgOverlaySize, setSize: setBgOverlaySize } = useBgOverlay()

    useEffect(
        () => {
            if (loading) setBgOverlaySize("")

            if (!loading) {
                if (globalThis?.window?.innerWidth < 640)
                    brands.length === 1 ?
                        setBgOverlaySize("26rem")
                        : brands.length > 2 ?
                            setBgOverlaySize("40rem")
                            : setBgOverlaySize("")
            }


            return () => setBgOverlaySize("")
        },
        [brands, loading]
    )


    if (loading) return <Skeleton {...{ className, inlinePadding, brands }} />

    if (brands.length === 0) return (
        <div
            className={`p-0 w-full md:col-span-3 grid md:max-h-full relative transition-all ease-in ${className} ${inlinePadding} grid grid-cols-3 gap-4`}
        >
            <div
                className={`col-span-3 grid grid-cols-2 md:grid-cols-3 ${brands.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
            >

                <AddGrid {...{ handleAdd, brands }} />
                <Link href={"#"} className="text-right max-sm:max-w-[17rem] col-span-2 justify-self-end flex items-center justify-end gap-2 w-fit mr-0 md:hover:border-b md:hover:border-gray-600 transition-all ease-in text-gray-600 md:hover:text-gray-800 max-sm:hover:underline-offset-2 max-sm:hover:underline">
                    Veja como criar seu primeiro projeto no Metrito
                    <ArrowTrendingUpIcon className="w-4 h-4 max-sm:self-end" />
                </Link>

            </div>

            <div className={`mt-10 col-span-3 md:col-span-2 p-8 py-16 rounded-md bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer shadow-lg grid place-items-center gap-4 font-medium text-gray-600 hover:text-gray-700 transition-all ease-in`}>
                <ExclamationCircleIcon className="h-8 w-8" />
                <span>Ainda não criou um projeto?</span>
            </div>
        </div>
    )

    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in ${className}`}
        >
            {
                brands.length > 0 &&
                <header className={`grid grid-flow-col-dense gap-8 sm:flex sm:justify-between ${inlinePadding}`}>
                    <div className="w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2 flex items-center relative">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 inset-y-auto pointer-events-none" />
                        <input type="text" id="name" value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Pesquise por nome"
                            className="block max-sm:col-span-2 sm:max-w-md sm:w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 bg-transparent placeholder:text-gray-400 focus:ring-transparent sm:text-sm sm:leading-6"
                        />
                    </div>

                    <button onClick={(e) => handleAdd(e)} className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                        <PlusIcon className="h-4 w-4" />
                        <span className="hidden sm:block">Criar projeto</span>
                    </button>
                </header>
            }


            {
                filterBySearch(data.brands).length <= 0 &&
                <div
                    className={`w-full py-8 text-center text-gray-500 font-medium ${inlinePadding}`}
                >
                    <span>Nenhum resultado para a pesquisa{search ? ` "${search}"` : ""}.</span>
                </div>
            }



            <div
                className={`${!needsOverflow ? "" : isBrandsOpen ? "max-sm:max-h-full" : "max-sm:max-h-[60vh] max-sm:overflow-y-hidden"} ${inlinePadding}`}
            >
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-4`}
                >
                    {
                        filterBySearch(data.brands).map(
                            (item: any, i: number) =>
                                <BrandCard key={item.id} {...{ id: item.id, name: item.name, src: item.src, role: item.role, workspaceId: item.workspaceId, workspaceName: item.workspaceId, membersCount: item.membersCount, connectionsCount: item.connectionsCount }} />
                        )
                    }

                    <AddGrid {...{ handleAdd, brands: filterBySearch(data.brands) }} />
                </div>
            </div>

            {
                needsOverflow &&
                <div className={`${isBrandsOpen ? "sticky bottom-0 inset-x-0" : "absolute -bottom-1"} md:hidden bg-gradient-to-t from-gray-200 w-full h-28 grid place-items-center`}>
                    <button onClick={toggleBrands} className="px-4 py-3 font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-100 hover:shadow-gray-300 transition-all ease-in flex items-center justify-center gap-3">
                        {
                            isBrandsOpen ?
                                (
                                    <>
                                        <ChevronUpIcon className="h-4 w-4" />
                                        Mostrar menos
                                    </>
                                )
                                :
                                (
                                    <>
                                        <ChevronDownIcon className="h-4 w-4" />
                                        Mostrar mais
                                    </>
                                )
                        }
                    </button>
                </div>
            }
        </div>
    )
}

function AddGrid({ brands, handleAdd }: { brands: any[], handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
    return (
        <div className={`${brands.length === 0 ? "col-span-2" : ""} ${brands.length % 2 === 0 || brands.length % 3 === 0 ?
            brands.length % 2 === 0 && brands.length % 3 === 0 ?
                "max-md:col-span-2 md:col-span-3"
                : brands.length % 2 === 0 ?
                    "md:col-span-3"
                    : brands.length % 3 === 0 ?
                        "max-md:col-span-2"
                        : ""
            : ""
            }  grid shadow rounded-md backdrop-blur-md transition-all ease-in`}>
            <button key={"add-grid"} onClick={(e) => handleAdd(e)} className={`${brands.length % 2 === 0 ? "py-8 md:py-10 flex" : "py-16 md:py-20 grid"} px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 hover:border-gray-600  place-items-center md:flex justify-center items-center gap-2 transition-all ease-in group`} >
                <PlusIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600 group-hover:text-gray-800 drop-shadow-lg" />
                <h2 className="font-semibold text-base  sm:text-lg text-gray-600 group-hover:text-gray-800 text-center drop-shadow-lg">
                    {brands.length > 0 ? "Criar projeto" : "Crie seu primeiro projeto"}
                </h2>
            </button>
        </div>
    )
}