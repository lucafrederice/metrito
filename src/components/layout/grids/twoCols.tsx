export default function TwoCols({ children }: { children: React.ReactNode }) {
    return (

        <div className="grid place-items-center items-start md:grid-flow-col gap-16 md:gap-20 w-full h-full min-h-[70vh] max-w-7xl rounded-xl">
            {children}
        </div>
    )
}