export default function Skeleton() {
    return (
        <div
            className="py-5 px-5 md:px-3 rounded-md bg-gray-300 grid grid-cols-5 gap-4 place-items-center relative shadow-md"
        >
            <div className="bg-gray-400 w-10 h-10 rounded-md animate-pulse" />
            <div className="col-span-3 justify-self-start grid gap-2 max-w-[12rem] md:max-w-[8rem] lg:max-w-[12rem]">
                <div className="h-4 w-32 animate-pulse bg-gray-400 rounded-md"></div>
                <div className="h-2 w-20 animate-pulse bg-gray-400 rounded-md"></div>
            </div>
            <div className="max-w-[3rem] col-span-1 relative w-full h-full">
                <div className="absolute inset-0 h-full grid items-center">
                    <p className="h-3 w-10 animate-pulse bg-gray-400 rounded-md"></p>
                </div>
            </div>
        </div>
    )
}