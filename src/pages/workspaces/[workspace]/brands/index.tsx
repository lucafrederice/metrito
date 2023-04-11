import MotionWrapper from "@/components/animation/motionWrapper";
import List from "@/components/workspace/brands/list";
import Skeleton from "@/components/workspace/brands/list/skeleton";
import { SharedBrandsType } from "@/pages";
import { useState } from "react";

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
    const [brands, setBrands] = useState([1, 2, 3, 4])
    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { }
    const [loading, setLoading] = useState(false)
    const inlinePadding = "max-sm:px-4"
    return (
        <MotionWrapper>
            <div key="brands" className="max-w-7xl mx-auto min-h-screen py-10 w-full grid place-items-center auto-rows-min gap-4">
                <List {...{ data, handleAdd, loading, brands, inlinePadding, }} />
            </div>
        </MotionWrapper>
    )
}