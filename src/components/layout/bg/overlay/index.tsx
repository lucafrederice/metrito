import { useBgOverlay } from "@/contexts/bgOverlay.context"

export default function BgOverlay() {
    const { size: bgOverlaySize } = useBgOverlay()
    return (
        <div
            style={{
                height: globalThis?.window?.innerWidth < 640 ? bgOverlaySize || "36rem" : ""
            }}
            className='absolute w-full h-[36rem] md:h-[26rem] bg-gray-50 shadow-md transition-all ease-in duration-500'
        />
    )
}