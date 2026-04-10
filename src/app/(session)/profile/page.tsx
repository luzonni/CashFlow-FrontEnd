"use client";

import { useUser } from "@components/hooks/useUser";


export default function Page() {
    const { user, loading } = useUser();
    if (!user || loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="bg-white rounded-2xl p-3">
               
            </div>
            <div className="col-span-2 col-start-1 row-start-2 bg-white rounded-2xl p-3">

            </div>
            <div className="col-start-2 row-start-1 bg-white rounded-2xl p-3">

            </div>
        </div>
    )
}