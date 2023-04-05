import MotionWrapper from "@/components/animation/motionWrapper";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Index() {
    return (
        <MotionWrapper>
            <div key="brand-connections" className="min-h-screen p-5 py-10 w-full grid place-items-center auto-rows-min gap-4">
                {/* <div className="text-left w-full max-w-7xl">
            <h1 className="text-lg font-semibold text-gray-500">Nome da página</h1>
        </div> */}
                <div className=" grid place-items-center w-full h-full min-h-[70vh] max-w-7xl border-2 bg-white border-gray-300 border-dashed rounded-xl shadow-2xl">
                    Connections
                </div>
            </div>
        </MotionWrapper>
    )
}