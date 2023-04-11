import { useColorThief } from "@/hooks/useColorThief"
import { Squares2X2Icon } from "@heroicons/react/20/solid"
import Link from "next/link"

export default function SharedBrand({ id, name, role, src, workspaceId, workspaceName }: { id: number, name: string, role: "admin" | "editor" | "viewer", src: string, workspaceId: number, workspaceName: string }) {

    const [h, s, l] = useColorThief(src)

    return (
        <Link key={id} href={`/workspaces/${workspaceId}/brands/${id}`}
            style={{
                "--tw-shadow-color": `hsl(${h}deg, ${s}%, ${30}%, 0.1)`,
                "--tw-shadow": "var(--tw-shadow-colored)",
            } as React.CSSProperties}
            className="py-5 px-5 md:px-3 rounded-md bg-white shadow-lg hover:shadow-xl transition-all ease-in group grid grid-cols-5 gap-4 place-items-center relative"
        >
            <div
                style={{
                    borderColor: `hsl(${h}deg,${s}%,${l && l > 60 ? 60 : l}%, 0.8)`,
                    // backgroundColor: `hsl(${h}deg,${s}%,${l > 50 ? 0 : 100}%, 1)`
                    // backgroundImage: `radial-gradient(farthest-corner at 50px 50px, hsl(${h}deg, ${s}%, ${l}%, 1), hsl(${h}deg, ${s}%, ${l}%, 1))`,
                } as React.CSSProperties}
                className="absolute inset-0 rounded-md group-hover:border group-hover:border-gray-600"
            />
            {
                src &&
                <img src={src} className="max-sm:justify-self-start w-10 h-10 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100" />
            }
            {
                !src && <Squares2X2Icon className="max-sm:justify-self-start w-10 h-10 text-gray-800 rounded-md opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100" />
            }

            <div className="col-span-3 justify-self-start text-left max-w-[12rem] md:max-w-[8rem] lg:max-w-[12rem]">
                <h2 className="font-semibold text-md text-gray-700 group-hover:text-gray-900 truncate"
                    style={{
                        color: `hsl(${h}deg, ${s}%, ${l && l > 30 ? 30 : l}%, 1)`
                    }}
                >{name}</h2>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 truncate"
                    style={{
                        color: `hsl(${h}deg, ${s}%, ${l && l > 30 ? 30 : l}%, 0.8)`
                    }}
                >{workspaceName}</p>
            </div>
            <div className="max-w-[3rem] col-span-1 relative w-full h-full">
                <div className="absolute inset-0 h-full grid items-center">
                    <p className="text-xs truncate text-center font-medium text-gray-400 group-hover:text-gray-500"
                        style={{
                            color: `hsl(${h}deg, ${s}%, ${l && l > 30 ? 30 : l}%, 0.8)`
                        }}
                    >{role}</p>
                </div>
            </div>
        </Link>
    )
}