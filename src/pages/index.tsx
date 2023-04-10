import MotionWrapper from "@/components/animation/motionWrapper";
import TwoCols from "@/components/layout/grids/twoCols";
import Welcome from "@/components/user/welcome";
import WorkspaceCard from "@/components/workspace/card";
import WorkspacesList from "@/components/workspace/list";
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

export type SharedBrandsType = {
    id: number,
    name: string,
    role: "admin" | "editor" | "viewer",
    workspaceName: string,
    workspaceId: number,
    src: string
}[]

export type WorkspacesType = {
    id: number,
    name: string,
    role: "owner" | "manager" | "member",
    src: string
}[]

const sharedBrands:
    SharedBrandsType = [
        {
            id: 1,
            name: "Ifood",
            role: "admin",
            workspaceName: "V4 Company",
            workspaceId: 1,
            src: "/v4.png"
        },
        {
            id: 2,
            name: "ge",
            role: "viewer",
            workspaceName: "Globo",
            workspaceId: 3,
            src: "/globo.svg"
        },
        {
            id: 3,
            name: "Transformando Palavras em Dinheiro",
            role: "viewer",
            workspaceName: "onovomercado",
            workspaceId: 6,
            src: "/onovomercado.png"
        },
        {
            id: 4,
            name: "g1",
            role: "admin",
            workspaceName: "Globo",
            workspaceId: 3,
            src: "/globo.svg"
        },
        {
            id: 5,
            name: "Disney",
            role: "editor",
            workspaceName: "V4 Company",
            workspaceId: 1,
            src: "/v4.png"
        },
    ]

const workspaces:
    WorkspacesType = [
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

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
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

    const inlinePadding = "max-sm:px-4"

    return (
        <MotionWrapper>
            <div className="relative">
                <div key="index" className="min-h-screen py-6 md:py-10 w-full grid place-items-center auto-rows-min gap-14">

                    <Welcome {...{ className: `${inlinePadding}` }} />

                    <TwoCols>

                        <WorkspacesList {...{ data, handleAdd, sharedBrands, workspaces, inlinePadding }} />

                        {
                            sharedBrands.length > 0 &&
                            <div
                                className={`p-0 justify-self-stretch md:justify-self-end w-full grid gap-4 ${inlinePadding}`}
                            >
                                <header className="max-w-[13rem] lg:max-w-xs">
                                    <h1 className="font-medium text-lg text-gray-600 sm:border-b-2 sm:pb-2 whitespace-pre-line truncate">Projetos compartilhados com você:</h1>
                                </header>
                                <div
                                    className="w-full grid grid-flow-row gap-4"
                                >
                                    {
                                        sharedBrands.map(
                                            (item, i) =>
                                                <Link key={data.sharedBrands[i].id} href={`/workspaces/${data.sharedBrands[i].workspaceId}/brands/${data.sharedBrands[i].id}`} className="py-5 px-3 rounded-md bg-white shadow-md sm:shadow-xl hover:shadow-2xl transition-all ease-in group border-2 hover:border-gray-400 grid grid-cols-5 gap-4 place-items-center" >
                                                    <img src={data.sharedBrands[i].src} alt="workspace" className="max-sm:justify-self-start w-10 h-10 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100" />
                                                    <div className="col-span-3 justify-self-start text-left max-w-[12rem] md:max-w-[8rem] lg:max-w-[12rem]">
                                                        <h2 className="font-semibold text-md text-gray-700 group-hover:text-gray-900 truncate">{data.sharedBrands[i].name}</h2>
                                                        <p className="text-xs text-gray-600 group-hover:text-gray-700 truncate">{data.sharedBrands[i].workspaceName}</p>
                                                    </div>
                                                    <div className="max-w-[3rem] col-span-1 relative w-full h-full">
                                                        <div className="absolute inset-0 h-full grid items-center">
                                                            <p className="text-xs truncate text-center font-medium text-gray-400 group-hover:text-gray-500">{data.sharedBrands[i].role}</p>
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
                        <button onClick={() => setSharedBrands(prev => prev?.length > 0 ? [] : [1, 2, 3, 4, 5])}
                            className="px-4 py-3 rounded-md hover:bg-white/10 relative"
                        >
                            <RectangleGroupIcon className={`h-4 w-4 ${sharedBrands.length > 0 ? "text-white/75" : "text-white"}`} />
                            {
                                sharedBrands.length > 0 && (
                                    <div className="absolute inset-0 grid place-items-center">
                                        <div className="mx-auto -rotate-[20deg] h-[1px] w-7 bg-white" />
                                    </div>
                                )
                            }
                        </button>
                        <button
                            onClick={() => setWorkspaces(prev => {
                                const array = structuredClone(prev)
                                array.pop()
                                return [...array]
                            })}
                            className="px-4 py-3 rounded-md hover:bg-white/10">
                            <MinusIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => addW()}
                            className="px-4 py-3 rounded-md hover:bg-white/10">
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </MotionWrapper>
    )
}
