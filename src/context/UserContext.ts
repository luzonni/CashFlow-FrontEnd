
import { createContext } from "react";
import User from "../models/User";
import { CODE } from "@models/Config";

type UserContextProps = {
    user: User;
    setUser: (user: User) => void;
    setSettings: (code: CODE, value: string) => void;
    hasRole: (role: string) => boolean;
    refresh: () => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;