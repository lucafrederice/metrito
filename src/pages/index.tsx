import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Index() {
    return <div className="min-h-screen w-full grid place-items-center p-5 mt-8 ">
        <div className=" grid place-items-center w-full h-full max-w-7xl border-2 bg-white border-gray-300 border-dashed rounded-xl shadow-2xl">
            Content
        </div>
    </div>
}