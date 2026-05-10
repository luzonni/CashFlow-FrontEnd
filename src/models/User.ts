import Settings from "./Config";

type User = {
    id: string;
    username: string;
    birthday: string;
    email: string;
    roles: string[];
    settings: Settings;
    createdAt?: string;
}

export default User;