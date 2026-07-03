import { ReactNode } from "react";


export default function LayoutContent({ children }:{ children: ReactNode }) {
    return (
        <div className="w-full flex justify-center p-2">
            <div className="w-full max-w-290 flex flex-col items-center justify-center">
                { children }
            </div>
        </div>
    )
}