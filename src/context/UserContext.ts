
import { createContext } from "react";
import User from "../models/User";
import Settings, { CODE } from "@models/Config";

type UserContextProps = {
    user: User | null;
    setUser: (user: User) => void;
    setSettings: (code: CODE, value: string) => Promise<void>;
    loading: boolean;
    hasRole: (role: string) => boolean;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;