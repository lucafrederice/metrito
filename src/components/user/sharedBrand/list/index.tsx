import { SharedBrandsType } from "@/pages";
import SharedBrand from "../card";
import Skeleton from "@/components/user/sharedBrand/list/skeleton";
import { useBgOverlay } from "@/contexts/bgOverlay.context";
import { useEffect, useRef } from "react";

export default function SharedBrands({ sharedBrands, workspaces, inlinePadding, data, loading }: { sharedBrands: number[], workspaces: number[], inlinePadding: string, data: { sharedBrands: SharedBrandsType }, loading: boolean }) {

    const headerRef = useRef<HTMLHeadingElement>(null)
    // const { size: bgOverlaySize, setSize: setBgOverlaySize } = useBgOverlay()

    // useEffect(
    //     () => {
    //         if (loading) setBgOverlaySize("")

    //         if (!loading) {
    //             if (globalThis?.window?.innerWidth < 640 && headerRef.current)
    //                 workspaces.length > 0 && workspaces.length < 3 ?
    //                     setBgOverlaySize(headerRef.current?.getBoundingClientRect().top ? `${(headerRef.current?.getBoundingClientRect().top / 16) + 7}rem` : "50rem")
    //                     : setBgOverlaySize("")
    //         }


    //         return () => setBgOverlaySize("")
    //     },
    //     [workspaces, headerRef.current, loading]
    // )

    if (loading) return <Skeleton {...{ sharedBrands, inlinePadding }} />

    return <>
        {
            sharedBrands.length > 0 &&
            <div
                className={`p-0 justify-self-stretch md:justify-self-end w-full grid gap-4 ${inlinePadding}`}
            >
                <header ref={headerRef} className="max-w-[13rem] lg:max-w-xs">
                    <h1 className="font-medium text-lg text-gray-600 sm:border-b-2 sm:pb-2 whitespace-pre-line truncate">Projetos compartilhados com você:</h1>
                </header>
                <div
                    className="w-full grid grid-flow-row gap-4"
                >
                    {
                        sharedBrands.map(
                            (item, i) =>
                                <SharedBrand key={data.sharedBrands[i].id} {...{ id: data.sharedBrands[i].id, name: data.sharedBrands[i].name, role: data.sharedBrands[i].role, src: data.sharedBrands[i].src, workspaceId: data.sharedBrands[i].workspaceId, workspaceName: data.sharedBrands[i].workspaceName }} />
                        )
                    }
                </div>
            </div>
        }
    </>
}