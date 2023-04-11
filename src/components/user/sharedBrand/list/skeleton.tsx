import CardSkeleton from "@/components/user/sharedBrand/card/skeleton"

export default function Skeleton({ sharedBrands, inlinePadding }: { sharedBrands: number[], inlinePadding: string }) {
    return (
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
                    [1, 2, 3, 4, 5].map(
                        item => <CardSkeleton key={item} {...{ sharedBrands }} />
                    )
                }

            </div>
        </div>
    )
}