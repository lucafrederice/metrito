export default function Skeleton() {
    return (
        <div
            className={`bg-gray-300 rounded-md shadow-lg px-8 py-6 min-h-[6rem] grid grid-cols-3 grid-rows-2 grid-flow-col-dense gap-x-2 gap-y-1 border border-gray-300 shadow-gray-800/10`}
        >
            <div className={`col-span-2 text-lg font-medium justify-self-start self-end w-full h-4 rounded-md bg-gray-400 animate-pulse`} />

            <div className={`col-span-2 text-xs font-semibold justify-self-start self-start h-2 w-20 rounded-md bg-gray-400/50 animate-pulse`} />

            <div className={`h-2.5 w-2.5 rounded-full shadow-md justify-self-end self-start bg-gray-400 shadow-gray-400/50 animate-pulse`} />

            <div className={`text-sm font-medium justify-self-end self-end flex items-center justify-end gap-2 bg-gray-400/40 rounded-md animate-pulse`}>
                <div className="h-4 w-4" />
                <div />
            </div>
        </div>
    )
}