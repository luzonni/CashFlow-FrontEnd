import { toast } from "@heroui/react";
import { ApiError, ApiErrorResponse } from "@models/ApiError";


async function errorLauncher(res: Response): Promise<ApiError> {
    try {
        const error: ApiErrorResponse = await res.json();
        return new ApiError(
            res.status,
            error
        );
    } catch {
        return new ApiError(
            res.status,
            {
                code: "UNKNOWN_ERROR",
                message: await res.text()
            }
        );
    }
}

function errorCatcher(title: string, err: ApiError) {
    if (err instanceof ApiError) {
        if (err.errors?.length) {

            const description = err.errors
                .map(e => `• ${e.message}`)
                .join("\n");

            toast.danger(title, {
                description
            });
            return;
        }
        toast.danger(title, {
            description: err.message
        });
        return;
    }
    toast.danger(title, {
        description: "Unexpected error"
    });
}

export default {
    throw: errorLauncher,
    catch: errorCatcher
}