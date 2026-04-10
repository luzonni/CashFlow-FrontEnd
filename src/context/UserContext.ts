
import { createContext } from "react";
import User from "../models/User";

type UserContextProps = {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
    hasRole: (role: string) => boolean;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;