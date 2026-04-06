
import { createContext } from "react";
import User from "../models/User";

type UserContextProps = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;