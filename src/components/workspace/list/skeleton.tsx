import CardSkeleton from "@/components/workspace/card/skeleton"


export default function Skeleton({ inlinePadding, sharedBrands, className, workspaces }: { inlinePadding: string, sharedBrands: number[], className: string, workspaces: number[] }) {
    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in ${className}`}
        > <div
            className={`${inlinePadding}`}
        >
                <div
                    className={`grid grid-cols-2 ${sharedBrands.length === 0 ? "grid-cols-2 md:grid-cols-3" : ""} ${workspaces.length < 3 ? "grid-rows-1" : "grid-rows-2"} gap-4`}
                >
                    {
                        sharedBrands.length > 0 || globalThis?.window.innerWidth < 768 ?
                            [1, 2, 3, 4].map(
                                item => <CardSkeleton key={item} {...{ sharedBrands }} />
                            )
                            : [1, 2, 3, 4, 5, 6].map(
                                item => <CardSkeleton key={item} {...{ sharedBrands }} />
                            )
                    }
                </div>
            </div>

        </div>
    )
}