import MotionWrapper from "@/components/animation/motionWrapper";
import List from "@/components/workspace/brands/list";
import Skeleton from "@/components/workspace/brands/list/skeleton";
import { SharedBrandsType } from "@/pages";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowPathIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const data: {
    brands: SharedBrandsType & {
        connectionsCount: number,
        membersCount: number
    }[]
} = {
    brands: [
        {
            id: 1,
            name: "Disney",
            src: "/v4.png",
            role: "admin",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 4,
            membersCount: 2
        },
        {
            id: 2,
            name: "Facebook Ads",
            src: "/facebook.png",
            role: "editor",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 3,
            membersCount: 5
        },
        {
            id: 3,
            name: "Google Ads",
            src: "/google.png",
            role: "viewer",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 1,
            membersCount: 4
        },
        {
            id: 4,
            name: "Coca cola",
            src: "",
            role: "admin",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
        {
            id: 5,
            name: "Pepsi",
            src: "",
            role: "editor",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
        {
            id: 6,
            name: "Ruffles",
            src: "",
            role: "viewer",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
    ]
}

export default function Index() {
    const [brands, setBrands] = useState([
        {
            id: 1,
            name: "Disney",
            src: "/v4.png",
            role: "admin",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 4,
            membersCount: 2
        },
        {
            id: 2,
            name: "Facebook Ads",
            src: "/facebook.png",
            role: "editor",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 3,
            membersCount: 5
        },
        {
            id: 3,
            name: "Google Ads",
            src: "/google.png",
            role: "viewer",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 1,
            membersCount: 4
        },
        {
            id: 4,
            name: "Coca cola",
            src: "",
            role: "admin",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
        {
            id: 5,
            name: "Pepsi",
            src: "",
            role: "editor",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
        {
            id: 6,
            name: "Ruffles",
            src: "",
            role: "viewer",
            workspaceName: "",
            workspaceId: 1,
            connectionsCount: 5,
            membersCount: 1
        },
    ])

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { }
    const [loading, setLoading] = useState(false)
    const inlinePadding = "max-sm:px-4"
    const constraintsRef = useRef<HTMLDivElement>(null)

    return (
        <MotionWrapper>
            <div key="brands" className="max-w-7xl mx-auto min-h-screen py-10 w-full grid place-items-center auto-rows-min gap-4">
                <List {...{ data: { brands: brands }, handleAdd, loading, inlinePadding, }} />
            </div>

            <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
            <motion.div drag dragElastic={0.1} dragMomentum={false} dragConstraints={constraintsRef} className=" fixed bottom-2 inset-x-2 bg-black/75 backdrop-blur-[2px] w-fit px-3 py-2 rounded-md border border-black shadow-xl shadow-black/30 hover:shadow-xl hover:shadow-black/50 transition-shadow ease-in text-white grid gap-2 grid-flow-row place-items-center  cursor-grab hover:cursor-grabbing">
                <div className="place-items-center pointer-events-none mx-auto w-14 h-[2px] bg-white rounded">
                    {/* <EllipsisHorizontalIcon className="pointer-events-none" /> */}
                </div>
                <div className="flex">
                    <button
                        // @ts-ignore
                        onClick={() => setBrands(prev => prev.filter((item, i) => i < prev.length - 1))}
                        className="px-4 py-3 rounded-md hover:bg-white/10">
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setBrands(prev => prev.length >= data.brands.length ? [...prev] : [...prev, data.brands[prev.length]])}
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