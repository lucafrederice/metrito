import CardSkeleton from "@/components/workspace/brands/card/skeleton"


export default function Skeleton({ inlinePadding = "", className = "" }: { inlinePadding?: string, className?: string }) {
    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in ${className}`}
        > <div
            className={`${inlinePadding}`}
        >
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-4`}
                >
                    {
                        globalThis?.window?.innerWidth < 768 ?
                            [1, 2, 3, 4].map(
                                item => <CardSkeleton key={item} />
                            )
                            : [1, 2, 3, 4, 5, 6].map(
                                item => <CardSkeleton key={item} />
                            )
                    }
                </div>
            </div>

        </div>
    )
}