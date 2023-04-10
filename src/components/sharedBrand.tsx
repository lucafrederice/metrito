import { useColorThief } from "@/hooks/useColorThief"
import Link from "next/link"

export default function SharedBrand({ id, name, role, src, workspaceId, workspaceName }: { id: number, name: string, role: "admin" | "editor" | "viewer", src: string, workspaceId: number, workspaceName: string }) {

    const [h, s, l] = useColorThief(src)

    return (
        <Link key={id} href={`/workspaces/${workspaceId}/brands/${id}`}
            style={{
                "--tw-shadow-color": `hsl(${h}deg, ${s}%, ${20}%, 0.3)`,
                "--tw-shadow": "var(--tw-shadow-colored)",
            } as React.CSSProperties}
            className="py-5 px-3 rounded-md bg-white shadow-md hover:shadow-lg transition-all ease-in group border-2 hover:border-gray-400 grid grid-cols-5 gap-4 place-items-center"
        >
            <img src={src} alt="workspace" className="max-sm:justify-self-start w-10 h-10 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100" />
            <div className="col-span-3 justify-self-start text-left max-w-[12rem] md:max-w-[8rem] lg:max-w-[12rem]">
                <h2 className="font-semibold text-md text-gray-700 group-hover:text-gray-900 truncate">{name}</h2>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 truncate">{workspaceName}</p>
            </div>
            <div className="max-w-[3rem] col-span-1 relative w-full h-full">
                <div className="absolute inset-0 h-full grid items-center">
                    <p className="text-xs truncate text-center font-medium text-gray-400 group-hover:text-gray-500">{role}</p>
                </div>
            </div>
        </Link>
    )
}