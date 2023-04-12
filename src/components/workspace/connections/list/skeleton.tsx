import CardSkeleton from "@/components/workspace/connections/card/skeleton"

export default function Skeleton({ inlinePadding }: { inlinePadding: string }) {
    return (
        <div
            className={`p-0 w-full md:col-span-3 grid gap-4 md:max-h-full relative transition-all ease-in`}
        >
            <div
                className={`w-full grid grid-cols-1 md:grid-cols-4 gap-4 ${inlinePadding}`}
            >

                {
                    globalThis?.window?.innerWidth < 768 ?
                        [1, 2, 3, 4, 5, 6, 7, 8].map(
                            (item, i) =>
                                <CardSkeleton key={i} />
                        )
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(
                            (item, i) =>
                                <CardSkeleton key={i} />
                        )
                }

            </div>
        </div>
    )
}