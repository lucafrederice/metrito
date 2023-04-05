import MotionWrapper from "@/components/animation/motionWrapper";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Index() {

    const worskpacesRef = useRef<HTMLDivElement>(null)
    const [needsOverflowWorkspaces, setNeedsOverflowWorkpaces] = useState<boolean>()
    const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(false)

    const toggleWorkspaces = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsWorkspacesOpen(state => !state)
    }

    useEffect(
        () => {
            const handleResize = () => {
                console.log(worskpacesRef?.current?.scrollHeight)
                if (worskpacesRef?.current?.scrollHeight && worskpacesRef?.current?.scrollHeight > globalThis?.window?.innerHeight / 100 * 70)
                    setNeedsOverflowWorkpaces(true)
                if (worskpacesRef?.current?.scrollHeight && worskpacesRef?.current?.scrollHeight <= globalThis?.window?.innerHeight / 100 * 70)
                    setNeedsOverflowWorkpaces(false)
            }

            handleResize()

            worskpacesRef?.current?.addEventListener("resize", handleResize)

            return () => worskpacesRef?.current?.removeEventListener("resize", handleResize)
        },
        []
    )

    return (
        <MotionWrapper>
            <div key="index" className="min-h-screen px-4 py-6 md:py-10 w-full grid place-items-center auto-rows-min gap-14">

                <div className="w-full max-w-7xl">
                    <div className="max-w-lg">
                        <div className="flex gap-5">
                            <div className="flex-shrink-0">
                                <img className="mx-auto h-16 w-16 rounded-full" src={"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="" />
                            </div>
                            <div className="grid place-items-center sm:text-left">
                                <p className="text-sm font-medium text-gray-600 truncate max-w-[14rem] sm:max-w-sm">Bem vindo(a) de volta,
                                    <br />
                                    <span className="text-xl font-bold text-gray-900 sm:text-2xl truncate">Alice Oliveira Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, animi dolorem expedita aliquid repellendus architecto ea alias delectus voluptas quas, aspernatur quidem minima optio quaerat eos consectetur impedit tempora. Sit obcaecati reiciendis iusto odit officiis tenetur! Non nesciunt ipsa saepe ducimus sint magni, fuga molestiae blanditiis rerum maiores similique dolor!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="text-left w-full max-w-7xl">
                    <h1 className="text-lg font-semibold text-gray-500">Nome da página</h1>
                </div> */}


                <div className="grid place-items-center items-start md:grid-flow-col-dense gap-10 w-full h-full min-h-[70vh] max-w-7xl md:border-2  md:border-gray-300 md:border-dashed rounded-xl">
                    <div
                        ref={worskpacesRef}
                        className={`p-0 md:p-5 w-full md:col-span-2 grid gap-4 ${isWorkspacesOpen ? "" : "max-h-[70vh] overflow-y-hidden"} md:max-h-full relative`}
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
                            <div className="py-16 md:py-20 px-5 min rounded-md bg-white shadow-xl border-2 grid place-items-center gap-2" >
                                <span>Foto</span>
                                <h2 className="font-semibold text-lg">Nome</h2>
                                <p>Role</p>
                            </div>
                            <div className="grid shadow rounded-md bg-gray-200">
                                <div className="py-16 md:py-20 px-5 min rounded-md shadow-inner shadow-gray-300 border-2 border-dashed border-gray-400 grid place-items-center md:flex justify-center items-center gap-2" >
                                    <PlusIcon className="w-6 h-6 md:w-8 md:h-8" />
                                    <h2 className="font-semibold text-base  sm:text-lg text-gray-600 text-center drop-shadow-lg">Adicionar Workspace</h2>
                                </div>
                            </div>
                        </div>
                        {
                            needsOverflowWorkspaces &&
                            <div className={`${isWorkspacesOpen ? "" : "absolute"} md:hidden bg-gradient-to-t from-gray-200 bottom-0 w-full h-28 grid place-items-center`}>
                                <button onClick={toggleWorkspaces} className="px-4 py-3 font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-xl flex items-center justify-center gap-3">
                                    {
                                        isWorkspacesOpen ?
                                            (
                                                <>
                                                    <ChevronUpIcon className="h-4 w-4" />
                                                    Mostrar menos
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <ChevronDownIcon className="h-4 w-4" />
                                                    Mostrar mais
                                                </>
                                            )
                                    }
                                </button>
                            </div>
                        }
                    </div>
                    <div
                        className="p-0 md:p-5  w-full grid gap-4"
                    >
                        <h1 className="font-medium text-gray-600">Brands compartilhadas com você:</h1>
                        <div
                            className="w-full grid grid-flow-row gap-4"
                        >
                            <div className="py-7 px-5  rounded-md bg-white shadow-md sm:shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-md sm:shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-md sm:shadow-xl border-2 grid place-items-center" >
                                <h2 className="font-semibold text-md">Nome da Brand</h2>
                                <p className="text-xs">Workspace • Role</p>
                            </div>
                            <div className="py-7 px-5  rounded-md bg-white shadow-md sm:shadow-xl border-2 grid place-items-center" >
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