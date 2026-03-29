import { createContext } from "react";
import User from "../model/User";

type UserContextProps = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;