import { ArrowTrendingUpIcon, ChevronDownIcon, ChevronUpIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useMemo, useState } from "react"
import WorkspaceCard from "../card"
import { SharedBrandsType, WorkspacesType } from "@/pages"
import Skeleton from "../list/skeleton"
import Link from "next/link"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

export default function List({ workspaces, handleAdd, sharedBrands, data, className = "", inlinePadding = "", loading }: {
    handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    data: {
        workspaces: WorkspacesType,
        sharedBrands: SharedBrandsType,
    },
    workspaces: number[] | [],
    sharedBrands: number[] | [],
    className?: string,
    inlinePadding?: string,
    loading: boolean
}) {
    const needsOverflow = useMemo(
        () => workspaces.length > 4 ? true : false,
        [workspaces]
    )

    const toggleWorkspaces = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsWorkspacesOpen(state => !state)
    }

    const [isWorkspacesOpen, setIsWorkspacesOpen] = useState<boolean>(false)

    if (loading) return <Skeleton {...{ className, inlinePadding, workspaces, sharedBrands }} />

    if (workspaces.length === 0) return (
        <div
            className={`p-0 w-full md:col-span-3 grid md:max-h-full relative transition-all ease-in ${className} ${inlinePadding} grid grid-cols-3 gap-4`}
        >
            <div
                className={`col-span-3 grid grid-cols-2 ${sharedBrands.length === 0 ? "grid-cols-2 md:grid-cols-3" : ""} ${workspaces.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
            >

                <AddWorkspaceGrid {...{ handleAdd, sharedBrands, workspaces }} />
                <Link href={"#"} className="text-right max-sm:max-w-[17rem] col-span-2 justify-self-end flex items-center justify-end gap-2 w-fit mr-0 md:hover:border-b md:hover:border-gray-600 transition-all ease-in text-gray-600 md:hover:text-gray-800 max-sm:hover:underline-offset-2 max-sm:hover:underline">
                    Descubra o poder das workspaces do Metrito
                    <ArrowTrendingUpIcon className="w-4 h-4 max-sm:self-end" />
                </Link>

            </div>

            <div className={`mt-10 col-span-3 ${sharedBrands.length === 0 ? "md:col-span-2" : ""} p-8 py-16 rounded-md bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer shadow-lg grid place-items-center gap-4 font-medium text-gray-600 hover:text-gray-700 transition-all ease-in`}>
                <ExclamationCircleIcon className="h-8 w-8" />
                <span>Ainda não criou sua workspace?</span>
            </div>
        </div>
    )

    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in ${className}`}
        >
            {
                workspaces.length > 0 &&
                <header className={`grid grid-flow-col-dense gap-8 sm:flex sm:justify-between ${inlinePadding}`}>
                    <h1 className="w-4/6 sm:w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2">Workspaces que você tem acesso:</h1>

                    <button onClick={(e) => handleAdd(e)} className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                        <PlusIcon className="h-4 w-4" />
                        <span className="hidden sm:block">Criar Workspace</span>
                    </button>
                </header>
            }


            <div
                className={`${!needsOverflow ? "" : isWorkspacesOpen ? "max-sm:max-h-full" : "max-sm:max-h-[60vh] max-sm:overflow-y-hidden"} ${inlinePadding}`}
            >
                <div
                    className={`grid grid-cols-2 ${sharedBrands.length === 0 ? "grid-cols-2 md:grid-cols-3" : ""} ${workspaces.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
                >
                    {
                        workspaces.map(
                            (item: any, i: number) =>
                                <WorkspaceCard key={data.workspaces[i].id} {...{ id: data.workspaces[i].id, name: data.workspaces[i].name, src: data.workspaces[i].src, role: data.workspaces[i].role, sharedBrandsLength: sharedBrands.length }} />
                        )
                    }

                    <AddWorkspaceGrid {...{ handleAdd, sharedBrands, workspaces }} />
                </div>
            </div>

            {
                needsOverflow &&
                <div className={`${isWorkspacesOpen ? "sticky bottom-0 inset-x-0" : "absolute -bottom-1"} md:hidden bg-gradient-to-t from-gray-200 w-full h-28 grid place-items-center`}>
                    <button onClick={toggleWorkspaces} className="px-4 py-3 font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-100 hover:shadow-gray-300 transition-all ease-in flex items-center justify-center gap-3">
                        {
                            isWorkspacesOpen ?
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

function AddWorkspaceGrid({ workspaces, sharedBrands, handleAdd }: { workspaces: number[], sharedBrands: number[], handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
    return (
        <div className={`${workspaces.length === 0 ?
            "col-span-2"
            : sharedBrands.length > 0 ?
                workspaces.length % 2 === 0 ?
                    "md:col-span-2" : ""
                : workspaces.length % 3 === 0 ?
                    "md:col-span-3" : ""
            } ${workspaces.length % 2 === 0 ? "max-md:col-span-2" : ""}  grid shadow rounded-md backdrop-blur-md transition-all ease-in`}>
            <button key={"add-workspace-grid"} onClick={(e) => handleAdd(e)} className={`${workspaces.length % 2 === 0 ? "py-8 md:py-10 flex" : "py-16 md:py-20 grid"} px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 hover:border-gray-600  place-items-center md:flex justify-center items-center gap-2 transition-all ease-in group`} >
                <PlusIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600 group-hover:text-gray-800 drop-shadow-lg" />
                <h2 className="font-semibold text-base  sm:text-lg text-gray-600 group-hover:text-gray-800 text-center drop-shadow-lg">
                    {workspaces.length > 0 ? "Criar Workspaces" : "Crie sua primeira workspace"}
                </h2>
            </button>
        </div>
    )
}