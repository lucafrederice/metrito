import { CircleStackIcon, RectangleStackIcon } from "@heroicons/react/20/solid";

export default function Card({ name, status, brandsCount, source }: { name: string, status: string, brandsCount: number, source: string }) {
    return (
        <div
            className={`bg-white rounded-md shadow-lg px-8 py-6 grid grid-cols-3 grid-rows-2 grid-flow-col-dense gap-x-2 gap-y-1 border ${status === "active" ? "border-teal-300 shadow-teal-800/10" : status === "alert" ? "border-amber-300 shadow-amber-800/10" : status === "error" ? "border-red-300 shadow-red-800/10" : "border-gray-300 shadow-gray-800/10"}`}
        >
            <div className={`col-span-2 text-lg font-medium justify-self-start self-end w-full truncate ${status === "active" ? "text-teal-600" : status === "alert" ? "text-amber-600" : status === "error" ? "text-red-600" : "text-gray-600"}`}>
                {name}
            </div>

            <div className={`capitalize col-span-2 text-xs font-semibold justify-self-start self-start ${status === "active" ? "text-teal-900/60" : status === "alert" ? "text-amber-900/60" : status === "error" ? "text-red-900/60" : "text-gray-900/60"}`}>{source}</div>

            <div className={`h-2.5 w-2.5 rounded-full shadow-md justify-self-end self-start ${status === "active" ? "bg-teal-500 shadow-teal-500/50" : status === "alert" ? "bg-amber-500 shadow-amber-500/50 " : status === "error" ? "bg-red-500 shadow-red-500/50" : "bg-gray-500 shadow-gray-500/50"}`} />

            <div className={`text-sm font-medium justify-self-end self-end flex items-center justify-end gap-2 ${status === "active" ? "text-teal-900/40" : status === "alert" ? "text-amber-900/40" : status === "error" ? "text-red-900/40" : "text-gray-900/40"}`}>
                <RectangleStackIcon className="h-4 w-4" />
                <span>{brandsCount}</span>
            </div>
        </div>
    )
}