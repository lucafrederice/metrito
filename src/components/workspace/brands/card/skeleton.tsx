import { useColorThief } from "@/hooks/useColorThief";
import { Squares2X2Icon, StarIcon, UserCircleIcon, WrenchIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function BrandCard() {
    return (
        <div
            className="group py-6 md:py-12 px-4 min rounded-md bg-gray-300 shadow-lg transition-all ease-in group grid place-items-center gap-4 md:gap-5 relative"
        >
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-md bg-gray-400 animate-pulse transition-none ease-in" />
            <header className="grid place-items-center text-center gap-5">
                <div className={`max-w-[7rem] sm:max-w-[12rem]`}>
                    <div className="bg-gray-400 h-4 sm:h-5 w-28 sm:w-36 rounded-md animate-pulse"
                    >
                    </div>
                </div>

                <div className="grid place-items-center gap-1">
                    <div className="h-4 w-4 bg-gray-400 rounded-full animate-pulse" />


                    <div className={`max-w-[7rem] sm:max-w-[12rem] lg:max-w-[14rem] `}>
                        <div className="bg-gray-400 h-3 w-12 sm:w-20 rounded-md animate-pulse" />
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 sm:gap-8">
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-3 w-3 bg-gray-400 rounded-full animate-pulse" />
                        <div className="bg-gray-400 h-3 w-8 rounded-md animate-pulse" />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-3 w-3 bg-gray-400 rounded-full animate-pulse" />
                        <div className="bg-gray-400 h-3 w-8 rounded-md animate-pulse" />
                    </div>
                </div>



            </header>
        </div>
    )
}