"user client";

import UserContext from "@/features/context/UserContext";
import User from "@/features/model/User";
import { ReactNode, useEffect, useState } from "react";

export function UserProdiver({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser) {
            setUser(JSON.parse(storeUser));
        }
    },[]);

    useEffect(() => {
        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        }else {
            localStorage.removeItem("user");
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}