import MotionWrapper from "@/components/animation/motionWrapper";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Index() {
    return (
        <MotionWrapper>
            <div key="index" className="min-h-screen px-4 py-12 w-full grid place-items-center auto-rows-min gap-4">
                <div className="text-left w-full max-w-7xl">
                    <h1 className="text-lg font-semibold text-gray-500">Nome da página</h1>
                </div>
                <div className="grid place-items-center items-start md:grid-flow-col-dense gap-10 w-full h-full min-h-[70vh] max-w-7xl md:border-2  md:border-gray-300 md:border-dashed rounded-xl">
                    <div
                        className="p-0 md:p-5 w-full md:col-span-2 grid gap-4"
                    >
                        <h1 className="font-medium text-gray-600">Workspaces que você tem acesso:</h1>
                        <div
                            className="grid grid-cols-2 grid-rows-2 gap-2"
                        >
                            <div className="py-16 md:py-20 px-5 min rounded-md bg-white shadow-xl border-2 grid place-items-center gap-2" >
                                <span>Foto</span>
                                <h2 className="font-semibold text-lg">Nome</h2>
                                <p>Role</p>
                            </div>
                            <div className="py-16 md:py-20 px-5 min rounded-md bg-white shadow-xl border-2 grid place-items-center gap-2" >
                                <span>Foto</span>
                                <h2 className="font-semibold text-lg">Nome</h2>
                                <p>Role</p>
                            </div>
                            <div className="py-16 md:py-20 px-5 min rounded-md bg-white shadow-xl border-2 grid place-items-center gap-2" >
                                <span>Foto</span>
                                <h2 className="font-semibold text-lg">Nome</h2>
                                <p>Role</p>
                            </div>
                            <div className="grid shadow rounded-md bg-gray-200">
                                <div className="py-16 md:py-20 px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 grid place-items-center gap-2" >
                                    <h2 className="font-semibold text-lg text-gray-600 text-center drop-shadow-lg">+ Adicionar Workspace</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="p-0 md:p-5  w-full grid gap-4"
                    >
                        <h1 className="font-medium text-gray-600">Brands compartilhadas com você:</h1>
                        <div
                            className="w-full grid grid-flow-row gap-4"
                        >
                            <div className="py-7 px-5  rounded-md bg-white shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MotionWrapper>
    )
}