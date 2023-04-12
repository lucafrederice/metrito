import MotionWrapper from "@/components/animation/motionWrapper";
import Card from "@/components/workspace/connections/card";
import Skeleton from "@/components/workspace/connections/card/skeleton";
import List from "@/components/workspace/connections/list";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const data = {
    connections: [
        {
            id: 1,
            name: "Arezzo",
            source: "facebook ads",
            status: "error",
            brandsCount: 1
        },
        {
            id: 9,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "active",
            brandsCount: 0
        },
        {
            id: 2,
            name: "iFood",
            source: "google analytics",
            status: "error",
            brandsCount: 2
        },
        {
            id: 4,
            name: "Paulo Muzy",
            source: "facebook",
            status: "alert",
            brandsCount: 2
        },
        {
            id: 7,
            name: "Santos FC",
            source: "hotmart",
            status: "active",
            brandsCount: 5
        },
        {
            id: 5,
            name: "onovomercado",
            source: "tiktok ads",
            status: "alert",
            brandsCount: 5
        },
        {
            id: 6,
            name: "uol",
            source: "linkedin ads",
            status: "alert",
            brandsCount: 4
        },
        {
            id: 15,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "expired",
            brandsCount: 1
        },
        {
            id: 3,
            name: "Zé Delivery",
            source: "google ads",
            status: "error",
            brandsCount: 0
        },
        {
            id: 12,
            name: "Bar da rosa",
            source: "monetizze",
            status: "active",
            brandsCount: 2
        },
        {
            id: 13,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "expired",
            brandsCount: 0
        },
        {
            id: 16,
            name: "Bar da rosa",
            source: "monetizze",
            status: "expired",
            brandsCount: 2
        },
        {
            id: 8,
            name: "Brechó da Ana",
            source: "google ads",
            status: "active",
            brandsCount: 3
        },
        {
            id: 10,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "active",
            brandsCount: 1
        },
        {
            id: 11,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "active",
            brandsCount: 1
        },
        {
            id: 14,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "expired",
            brandsCount: 1
        },
    ]
}

export default function Index() {

    const [connections, setConnections] = useState([
        {
            id: 1,
            name: "Arezzo",
            source: "facebook ads",
            status: "error",
            brandsCount: 1
        },
        {
            id: 9,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "active",
            brandsCount: 0
        },
        {
            id: 2,
            name: "iFood",
            source: "google analytics",
            status: "error",
            brandsCount: 2
        },
        {
            id: 4,
            name: "Paulo Muzy",
            source: "facebook",
            status: "alert",
            brandsCount: 2
        },
        {
            id: 7,
            name: "Santos FC",
            source: "hotmart",
            status: "active",
            brandsCount: 5
        },
        {
            id: 5,
            name: "onovomercado",
            source: "tiktok ads",
            status: "alert",
            brandsCount: 5
        },
        {
            id: 6,
            name: "uol",
            source: "linkedin ads",
            status: "alert",
            brandsCount: 4
        },
        {
            id: 15,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "expired",
            brandsCount: 1
        },
        {
            id: 3,
            name: "Zé Delivery",
            source: "google ads",
            status: "error",
            brandsCount: 0
        },
        {
            id: 12,
            name: "Bar da rosa",
            source: "monetizze",
            status: "active",
            brandsCount: 2
        },
        {
            id: 13,
            name: "Galeria do Rock",
            source: "pagar.me",
            status: "expired",
            brandsCount: 0
        },
        {
            id: 16,
            name: "Bar da rosa",
            source: "monetizze",
            status: "expired",
            brandsCount: 2
        },
        {
            id: 8,
            name: "Brechó da Ana",
            source: "google ads",
            status: "active",
            brandsCount: 3
        },
        {
            id: 10,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "active",
            brandsCount: 1
        },
        {
            id: 11,
            name: "Boulevard Shopping",
            source: "facebook",
            status: "active",
            brandsCount: 1
        },
        {
            id: 14,
            name: "Iguatemi Shopping",
            source: "hotmart",
            status: "expired",
            brandsCount: 1
        },
    ])

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { }

    const inlinePadding = "max-sm:px-4"
    const [loading, setLoading] = useState(false)

    const constraintsRef = useRef<HTMLDivElement>(null)

    return (
        <MotionWrapper>
            <div key="workspace-connections" className="max-w-7xl mx-auto min-h-screen py-10 w-full grid place-items-center auto-rows-min gap-4">
                <List {...{ connections, handleAdd, inlinePadding, loading }} />
            </div>


            <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
            <motion.div drag dragElastic={0.1} dragMomentum={false} dragConstraints={constraintsRef} className=" fixed bottom-2 inset-x-2 bg-black/75 backdrop-blur-[2px] w-fit px-3 py-2 rounded-md border border-black shadow-xl shadow-black/30 hover:shadow-xl hover:shadow-black/50 transition-shadow ease-in text-white grid gap-2 grid-flow-row place-items-center  cursor-grab hover:cursor-grabbing">
                <div className="place-items-center pointer-events-none mx-auto w-14 h-[2px] bg-white rounded">
                    {/* <EllipsisHorizontalIcon className="pointer-events-none" /> */}
                </div>
                <div className="flex">
                    <button
                        // @ts-ignore
                        onClick={() => setConnections(prev => prev.filter((item, i) => i < prev.length - 1))}
                        className="px-4 py-3 rounded-md hover:bg-white/10">
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setConnections(prev => prev.length >= data.connections.length ? [...prev] : [...prev, data.connections[prev.length]])}
                        className="px-4 py-3 rounded-md hover:bg-white/10">
                        <PlusIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setLoading(state => !state)}
                        className="px-4 py-3 rounded-md hover:bg-white/10 relative">
                        <ArrowPathIcon className={`h-4 w-4 ${loading ? "text-white/75" : "text-white"}`} />
                        {
                            loading && <div className="absolute inset-0 grid place-items-center">
                                <div className="mx-auto -rotate-[20deg] h-[1px] w-7 bg-white" />
                            </div>
                        }

                    </button>
                </div>
            </motion.div>
        </MotionWrapper>
    )
}