import MotionWrapper from "@/components/animation/motionWrapper";
import { useBgOverlay } from "@/contexts/bgOverlayContext";
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Index() {

    const { size: bgOverlaySize, setSize: setBgOverlaySize } = useBgOverlay()

    const [workspaces, setWorkspaces] = useState([1, 2, 3, 4, 5, 6, 7])
    const needsOverflow = useMemo(
        () => workspaces.length > 4 ? true : false,
        [workspaces]
    )

    useEffect(
        () => workspaces.length > 0 && workspaces.length < 3 ? setBgOverlaySize("48rem") : setBgOverlaySize(""),
        [workspaces]
    )

    const [isWorkspacesOpen, setIsWorkspacesOpen] = useState<boolean>(false)

    const toggleWorkspaces = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsWorkspacesOpen(state => !state)
    }

    return (
        <MotionWrapper>
            <div key="index" className="min-h-screen px-4 py-6 md:py-10 w-full grid place-items-center auto-rows-min gap-14">

                <div className="w-full max-w-7xl">
                    <div className="max-w-lg">
                        <div className="flex gap-5">
                            <div className="flex-shrink-0">
                                <img className="mx-auto h-16 w-16 rounded-full" src={"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="" />
                            </div>
                            <div className="grid place-items-center sm:text-left">
                                <p className="text-sm font-medium text-gray-600 truncate whitespace-pre-line max-w-[13rem] sm:max-w-sm">Bem vindo(a) de volta,
                                    <br />
                                    <span className="text-xl font-bold text-gray-900 sm:text-2xl truncate">Alice Oliveira Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, animi dolorem expedita aliquid repellendus architecto ea alias delectus voluptas quas, aspernatur quidem minima optio quaerat eos consectetur impedit tempora. Sit obcaecati reiciendis iusto odit officiis tenetur! Non nesciunt ipsa saepe ducimus sint magni, fuga molestiae blanditiis rerum maiores similique dolor!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="text-left w-full max-w-7xl">
                    <h1 className="text-lg font-semibold text-gray-500">Nome da página</h1>
                </div> */}


                <div className="grid place-items-center items-start md:grid-flow-col-dense gap-16 md:gap-24 w-full h-full min-h-[70vh] max-w-7xl rounded-xl">

                    <div
                        className={`p-0  w-full md:col-span-2 grid gap-4 md:max-h-full relative transition-all ease-in`}
                    >
                        {
                            workspaces.length > 0 &&
                            <div className="grid grid-flow-col-dense gap-8 sm:flex sm:justify-between">
                                <h1 className="w-4/6 sm:w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2">Workspaces que você tem acesso:</h1>
                                <button
                                    onClick={() => setWorkspaces(prev => {
                                        const array = structuredClone(prev)
                                        array.pop()
                                        return [...array]
                                    })}
                                    className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                                    <MinusIcon className="h-4 w-4" />
                                </button>
                                <button onClick={() => setWorkspaces(prev => [...prev, prev[-1] + 1])} className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                                    <PlusIcon className="h-4 w-4" />
                                    <span className="hidden sm:block">Criar Workspace</span>
                                </button>
                            </div>
                        }


                        <div
                            className={`${!needsOverflow ? "" : isWorkspacesOpen ? "max-sm:max-h-full" : "max-sm:max-h-[60vh] max-sm:overflow-y-hidden"}`}
                        >
                            <div
                                className={`grid grid-cols-2 ${workspaces.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
                            >
                                {
                                    workspaces.map(
                                        item =>
                                            <Link key={item} href={'/workspaces/workspace'} className="py-8 md:py-16 px-4 min rounded-md bg-white shadow-xl hover:shadow-2xl transition-all ease-in group border-2 hover:border-gray-400 grid place-items-center gap-4" >
                                                <img src={'v4.png'} alt="workspace" className="w-20 h-20 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100 transition-none ease-in" />
                                                <header className="grid place-items-center text-center">
                                                    <div className="max-w-[7rem] sm:max-w-[10rem]">
                                                        <h2 className="font-semibold text-md text-gray-700 group-hover:text-gray-900 truncate">V4 Company Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dicta?</h2>
                                                    </div>
                                                    <div className="max-w-[7rem] sm:max-w-[10rem] lg:max-w-[12rem]">
                                                        <p className="text-xs text-gray-600 group-hover:text-gray-700 truncate">Proprietário Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, animi? </p>
                                                    </div>
                                                </header>
                                            </Link>
                                    )
                                }
                                <div className={`${workspaces.length % 2 === 0 ? "col-span-2" : ""}  grid shadow rounded-md bg-gray-200`}>
                                    <button key={"add-workspace-grid"} onClick={() => setWorkspaces(prev => [...prev, prev[-1] + 1])} className={`${workspaces.length % 2 === 0 ? "py-8 md:py-10 flex" : "py-16 md:py-20 grid"} px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 hover:border-gray-600  place-items-center md:flex justify-center items-center gap-2 transition-all ease-in group`} >
                                        <PlusIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600 group-hover:text-gray-800 drop-shadow-lg" />
                                        <h2 className="font-semibold text-base  sm:text-lg text-gray-600 group-hover:text-gray-800 text-center drop-shadow-lg">
                                            {workspaces.length > 0 ? "Criar Workspaces" : "Crie sua primeira workspace"}
                                        </h2>
                                    </button>
                                </div>
                            </div>

                            {
                                needsOverflow &&
                                <div className={`${isWorkspacesOpen ? "" : "absolute"} md:hidden bg-gradient-to-t from-gray-200 -bottom-1 w-full h-28 grid place-items-center`}>
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
                    </div>

                    <div
                        className="p-0 justify-self-stretch md:justify-self-end w-full grid gap-4"
                    >
                        <header className="max-w-[13rem] lg:max-w-xs">
                            <h1 className="font-medium text-lg text-gray-600 sm:border-b-2 sm:pb-2 whitespace-pre-line truncate">Projetos compartilhados com você:</h1>
                        </header>
                        <div
                            className="w-full grid grid-flow-row gap-4"
                        >
                            {
                                [1, 2, 3, 4].map(
                                    item =>
                                        <Link key={item} href={"/workspaces/workspace/brands/brand"} className="py-5 px-3 rounded-md bg-white shadow-md sm:shadow-xl hover:shadow-2xl transition-all ease-in group border-2 hover:border-gray-400 grid grid-flow-col gap-2 place-items-center" >
                                            <img src={'v4.png'} alt="workspace" className="col-span-1 max-sm:justify-self-start w-10 h-10 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100" />
                                            <div className="col-span-2 justify-self-center max-w-[12rem] md:max-w-[8rem] lg:max-w-[11rem]">
                                                <h2 className="font-semibold text-md text-gray-700 group-hover:text-gray-900 truncate">Nome da Brand asdasdasda</h2>
                                                <p className="text-xs text-gray-600 group-hover:text-gray-700 truncate">Workspace Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, magnam.</p>
                                            </div>
                                            <div className="max-w-[3rem] col-span-4 relative w-full h-full">
                                                <div className="absolute inset-0 h-full grid items-center">
                                                    <p className="text-xs truncate text-center font-medium text-gray-500 group-hover:text-gray-600">Viewer</p>
                                                </div>
                                            </div>
                                        </Link>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </MotionWrapper>
    )
}