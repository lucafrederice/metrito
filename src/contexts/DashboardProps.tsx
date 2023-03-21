import { createContext, useContext, useState } from "react";

const DashboardPropsContext = createContext<{
    props?: object,
    update?: (par: object) => void
}>({
})

export default function DashboardPropsProvider({ children }: { children: React.ReactNode }) {

    const [props, setProps] = useState<object>()

    return (
        <DashboardPropsContext.Provider value={{ props, update: setProps }}>
            {children}
        </DashboardPropsContext.Provider>
    )
}

export const useDashboardProps = () => useContext(DashboardPropsContext)