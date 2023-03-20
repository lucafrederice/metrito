"use client"

import { ReactNode } from "react"
import { AnimatePresence } from "framer-motion"


export default function AnimationWrapper({ children }: { children: ReactNode }) {
    return (
        <AnimatePresence
            // initial={false}
            mode="wait"
        >
            {children}
        </AnimatePresence>
    )
}