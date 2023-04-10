import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useMemo, useState } from "react"
import WorkspaceCard from "../card"
import { SharedBrandsType, WorkspacesType } from "@/pages"

export default function List({ workspaces, handleAdd, sharedBrands, data, className = "", inlinePadding = "" }: {
    handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    data: {
        workspaces: WorkspacesType,
        sharedBrands: SharedBrandsType,
    },
    workspaces: number[] | [],
    sharedBrands: number[] | [],
    className?: string,
    inlinePadding?: string
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
                                <WorkspaceCard key={data.workspaces[i].id} {...{ id: data.workspaces[i].id, name: data.workspaces[i].name, src: data.workspaces[i].src, role: data.workspaces[i].role, shareBrandsLength: sharedBrands.length }} />
                        )
                    }

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