import { ValidLucideIcons } from "@components/Icon";
import { createContext } from "react";

type ConfirmActionProps = {
    confirm: (
        icon: ValidLucideIcons,
        title: string,
        description: string,
        accept: () => Promise<void>
    ) => void;
}

const ConfirmActionContext = createContext<ConfirmActionProps | null>(null);

export default ConfirmActionContext;