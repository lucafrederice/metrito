export default function TwoCols({ children }: { children: React.ReactNode }) {
    return (

        <div className="grid place-items-center items-start md:grid-flow-col-dense gap-16 md:gap-24 w-full h-full min-h-[70vh] max-w-7xl rounded-xl">
            {children}
        </div>
    )
}