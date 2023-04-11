import { useBg } from "@/contexts/bg.context"

export default function Bg({ children }: { children: React.ReactNode }) {
    const { color } = useBg()
    return <div className='h-full bg-gray-200 relative'
        style={{
            backgroundColor: color || "",
        }}
    >{children}</div>
}