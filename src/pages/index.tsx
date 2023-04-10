import MotionWrapper from "@/components/animation/motionWrapper";
import TwoCols from "@/components/layout/grids/twoCols";
import Welcome from "@/components/user/welcome";
import WorkspaceCard from "@/components/workspace/card";
import { useBgOverlay } from "@/contexts/bgOverlayContext";
import { RectangleGroupIcon, StarIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, MinusIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const sharedBrands = [
    {
        id: 1,
        name: "Ifood",
        role: "admin",
        workspace: "V4 Company",
        src: "/v4.png"
    },
    {
        id: 2,
        name: "ge",
        role: "viewer",
        workspace: "Globo",
        src: "/globo.svg"
    },
    {
        id: 3,
        name: "Transformando Palavras em Dinheiro",
        role: "viewer",
        workspace: "onovomercado",
        src: "/onovomercado.png"
    },
    {
        id: 4,
        name: "g1",
        role: "admin",
        workspace: "Globo",
        src: "/globo.svg"
    },
    {
        id: 5,
        name: "Disney",
        role: "editor",
        workspace: "V4 Company",
        src: "/v4.png"
    },
]

const workspaces: {
    id: number,
    name: string,
    role: "owner" | "manager" | "member",
    src: string
}[] = [
        {
            id: 1,
            name: "V4 Company",
            role: "owner",
            src: "/v4.png",
        },
        {
            id: 2,
            name: "Ifood",
            role: "member",
            src: "/ifood.png"
        },
        {
            id: 3,
            name: "Globo",
            role: "manager",
            src: "/globo.svg"
        },
        {
            id: 4,
            name: "Black Rat",
            role: "owner",
            src: "/blackrat.png"
        },
        {
            id: 5,
            name: "G4 Educação",
            role: "owner",
            src: "/g4.png"
        },
        {
            id: 6,
            name: "onovomercado",
            role: "manager",
            src: "/onovomercado.png"
        },
        {
            id: 7,
            name: "Tendency",
            role: "manager",
            src: "/tendency.png"
        },
        {
            id: 8,
            name: "Vercel",
            role: "member",
            src: "/vercel.svg"
        },
        {
            id: 9,
            name: "Facebook",
            role: "manager",
            src: "/facebook.png"
        },
        {
            id: 10,
            name: "Google",
            role: "member",
            src: "/google.png"
        },
    ]

const data = {
    workspaces,
    sharedBrands,
}


export default function Index() {
    const { size: bgOverlaySize, setSize: setBgOverlaySize } = useBgOverlay()

    const [workspaces, setWorkspaces] = useState([1])
    const needsOverflow = useMemo(
        () => workspaces.length > 4 ? true : false,
        [workspaces]
    )

    const addW = () => {
        setWorkspaces(prev => prev.length >= data.workspaces.length ? prev : [...prev, prev[1]])
    }

    useEffect(
        () => {
            if (globalThis?.window?.innerWidth < 640)
                workspaces.length > 0 && workspaces.length < 3 ?
                    setBgOverlaySize("50rem")
                    : setBgOverlaySize("")
        },
        [workspaces]
    )

    const [isWorkspacesOpen, setIsWorkspacesOpen] = useState<boolean>(false)

    const toggleWorkspaces = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsWorkspacesOpen(state => !state)
    }

    const [sharedBrands, setSharedBrands] = useState<number[] | []>([])

    const constraintsRef = useRef<HTMLDivElement>(null)

    return (
        <MotionWrapper>
            <div className="relative">
                <div key="index" className="min-h-screen px-4 py-6 md:py-10 w-full grid place-items-center auto-rows-min gap-14">

                    <Welcome />

                    <TwoCols>

                        <div
                            className={`p-0  w-full md:col-span-2 grid gap-4 md:max-h-full relative transition-all ease-in`}
                        >
                            {
                                workspaces.length > 0 &&
                                <div className="grid grid-flow-col-dense gap-8 sm:flex sm:justify-between">
                                    <h1 className="w-4/6 sm:w-full col-span-2 text-lg font-medium text-gray-600 sm:border-b-2 sm:pb-2">Workspaces que você tem acesso:</h1>

                                    <button onClick={() => addW()} className="self-center justify-self-end flex flex-shrink-0 gap-2 items-center w-fit sm:w-auto h-fit text-sm font-medium px-3 sm:px-4 py-3 sm:py-2 rounded-md bg-gray-700  text-gray-50 shadow-lg shadow-gray-300 hover:shadow-xl hover:bg-gray-600 hover:shadow-gray-300 transition-all ease-in">
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="hidden sm:block">Criar Workspace</span>
                                    </button>
                                </div>
                            }


                            <div
                                className={`${!needsOverflow ? "" : isWorkspacesOpen ? "max-sm:max-h-full" : "max-sm:max-h-[60vh] max-sm:overflow-y-hidden"}`}
                            >
                                <div
                                    className={`grid grid-cols-2 ${sharedBrands.length === 0 ? "grid-cols-2 md:grid-cols-3" : ""} ${workspaces.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
                                >
                                    {
                                        workspaces.map(
                                            (item, i) =>
                                                <WorkspaceCard key={data.workspaces[i].id} {...{ id: data.workspaces[i].id, name: data.workspaces[i].name, src: data.workspaces[i].src, role: data.workspaces[i].role, shareBrandsLength: sharedBrands.length }} />
                                        )
                                    }

                                    <div className={`${workspaces.length === 0 ?
                                        "col-span-2"
                                        : sharedBrands.length > 0 ?
                                            workspaces.length % 2 === 0 ?
                                                "md:col-span-2" : ""
                                            : workspaces.length % 3 === 0 ?
                                                "md:colcol-span-3" : ""
                                        } ${workspaces.length % 2 === 0 ? "max-md:col-span-2" : ""}  grid shadow rounded-md backdrop-blur-md transition-all ease-in`}>
                                        <button key={"add-workspace-grid"} onClick={() => addW()} className={`${workspaces.length % 2 === 0 ? "py-8 md:py-10 flex" : "py-16 md:py-20 grid"} px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 hover:border-gray-600  place-items-center md:flex justify-center items-center gap-2 transition-all ease-in group`} >
                                            <PlusIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-600 group-hover:text-gray-800 drop-shadow-lg" />
                                            <h2 className="font-semibold text-base  sm:text-lg text-gray-600 group-hover:text-gray-800 text-center drop-shadow-lg">
                                                {workspaces.length > 0 ? "Criar Workspaces" : "Crie sua primeira workspace"}
                                            </h2>
                                        </button>
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
                        </div>

                        {
                            sharedBrands.length > 0 &&
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
                                        sharedBrands.map(
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
                        }

                    </TwoCols>
                </div>

                <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
                <motion.div drag dragElastic={0.1} dragMomentum={false} dragConstraints={constraintsRef} className=" fixed bottom-2 inset-x-2 bg-black/75 backdrop-blur-[2px] w-fit px-3 py-2 rounded-md border border-black shadow-xl shadow-black/30 hover:shadow-xl hover:shadow-black/50 transition-shadow ease-in text-white grid gap-2 grid-flow-row place-items-center  cursor-grab hover:cursor-grabbing">
                    <div className="place-items-center pointer-events-none mx-auto w-14 h-[2px] bg-white rounded">
                        {/* <EllipsisHorizontalIcon className="pointer-events-none" /> */}
                    </div>
                    <div className="flex">
                        <button onClick={() => setSharedBrands(prev => prev?.length > 0 ? [] : [1, 2, 3, 4])}
                            className="px-4 py-2 rounded-md hover:bg-white/10"
                        >
                            <RectangleGroupIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => addW()}
                            className="px-4 py-2 rounded-md hover:bg-white/10">
                            <PlusIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setWorkspaces(prev => {
                                const array = structuredClone(prev)
                                array.pop()
                                return [...array]
                            })}
                            className="px-4 py-2 rounded-md hover:bg-white/10">
                            <MinusIcon className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </MotionWrapper>
    )
}
