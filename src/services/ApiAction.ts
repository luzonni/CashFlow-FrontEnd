import { ApiError } from "@models/ApiError";
import ErrorHandler from "./ErrorHandler";


export default async function apiAction(func: () => Promise<void>, title: string = "Unknow error") {
    try {
        await func();
    } catch (err) {
        if (err instanceof ApiError) {
            ErrorHandler.catch(title, err);
        }
    }
}