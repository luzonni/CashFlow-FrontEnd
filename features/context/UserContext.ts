
import { createContext } from "react";
import User from "../models/User";

type UserContextProps = {
    user: User | null;
    loading: boolean;
    refresh: () => Promise<void>
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;