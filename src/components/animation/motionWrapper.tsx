"use client"

import { motion } from "framer-motion"

export default function MotionWrapper({ children, layoutId }: { children: React.ReactNode, layoutId?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={layoutId || ""}
        >
            {children}
        </motion.div>
    )
}