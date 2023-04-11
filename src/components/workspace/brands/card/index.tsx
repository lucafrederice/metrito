import { useColorThief } from "@/hooks/useColorThief";
import { Squares2X2Icon, StarIcon, UserCircleIcon, UserGroupIcon, WrenchIcon, CircleStackIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function BrandCard({ id, name, role, src, workspaceId, workspaceName, connectionsCount, membersCount }: { id: number, name: string, role: "admin" | "editor" | "viewer", src: string, workspaceName: string, workspaceId: number, connectionsCount: number, membersCount: number }) {
    const [h, s, l] = useColorThief(src)

    return (
        <Link
            href={`/workspaces/${workspaceId}/brands/${id}`}
            style={{
                "--tw-shadow-color": h ? `hsl(${h}deg, ${s}%, ${30}%, 0.15)` : "",
                "--tw-shadow": "var(--tw-shadow-colored)",
            } as React.CSSProperties}
            className="group py-6 md:py-12 px-4 min rounded-md bg-white shadow-lg shadow-gray-300 hover:shadow-xl transition-all ease-in group grid place-items-center gap-4 md:gap-5 relative"
        >
            <div
                style={{
                    borderColor: `hsl(${h}deg,${s}%,${l && l > 60 ? 60 : l}%, 0.8)`,
                    // backgroundColor: `hsl(${h}deg,${s}%,${l > 50 ? 0 : 100}%, 1)`
                    // backgroundImage: `radial-gradient(farthest-corner at 50px 50px, hsl(${h}deg, ${s}%, ${l}%, 1), hsl(${h}deg, ${s}%, ${l}%, 1))`,
                } as React.CSSProperties}
                className="absolute inset-0 rounded-md group-hover:border-2 group-hover:border-gray-600"
            />


            {
                src && <img src={src} alt="workspace" className="w-20 h-20 md:w-32 md:h-32 rounded-md object-contain opacity-90 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100 transition-none ease-in" />
            }

            {
                !src && <Squares2X2Icon className="w-20 h-20 md:w-32 md:h-32 rounded-md object-contain opacity-90 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100 transition-none ease-in text-gray-800" />
            }

            <header className="grid place-items-center text-center gap-5">
                <div className={`max-w-[7rem] sm:max-w-[12rem]`}>
                    <h2 className="font-semibold text-md md:text-xl text-gray-700 group-hover:text-gray-900 truncate"
                        style={{
                            color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 1)`
                        }}
                    >
                        {name}
                    </h2>
                </div>

                <div className="grid place-items-center gap-1">
                    {
                        role === "admin" ?
                            <StarIcon className="h-3 w-3 text-gray-500"
                                style={{
                                    color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.8)`
                                }}
                            />
                            : role === "editor" ?
                                <WrenchIcon className="h-3 w-3 text-gray-500"
                                    style={{
                                        color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.8)`
                                    }}
                                />
                                : <UserCircleIcon className="h-3 w-3 text-gray-500"
                                    style={{
                                        color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.8)`
                                    }}
                                />
                    }


                    <div className={`max-w-[7rem] sm:max-w-[12rem] lg:max-w-[14rem] `}>
                        <p className="text-xs text-gray-500 capitalize font-medium group-hover:text-gray-700 truncate"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.8)`
                            }}
                        >
                            {role}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 sm:gap-8">
                    <div className="flex items-center justify-center gap-2 group-hover:text-gray-600">
                        <UserGroupIcon className="h-4 w-4 text-gray-400"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.6)`
                            }}
                        />
                        <span className="text-gray-400 text-xs font-medium"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.6)`
                            }}
                        >{membersCount}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 group-hover:text-gray-600">
                        <CircleStackIcon className="h-4 w-4 text-gray-400"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.6)`
                            }}
                        />
                        <span className="text-gray-400 text-xs font-medium"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l && l > 60 ? 60 : l}%, 0.6)`
                            }}
                        >{connectionsCount}</span>
                    </div>
                </div>

            </header>
        </Link>
    )
}