import { SharedBrandsType } from "@/pages";
import SharedBrand from "../card";
import Skeleton from "@/components/user/sharedBrand/list/skeleton";

export default function SharedBrands({ sharedBrands, inlinePadding, data, loading }: { sharedBrands: number[], inlinePadding: string, data: { sharedBrands: SharedBrandsType }, loading: boolean }) {
    if (loading) return <Skeleton {...{ sharedBrands, inlinePadding }} />

    return <>
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
                                <SharedBrand key={data.sharedBrands[i].id} {...{ id: data.sharedBrands[i].id, name: data.sharedBrands[i].name, role: data.sharedBrands[i].role, src: data.sharedBrands[i].src, workspaceId: data.sharedBrands[i].workspaceId, workspaceName: data.sharedBrands[i].workspaceName }} />
                        )
                    }
                </div>
            </div>
        }
    </>
}