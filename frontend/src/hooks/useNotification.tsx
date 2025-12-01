import { useContext } from "react";
import { v4 as randomId } from "uuid";

// Context
import { NotificationContext } from "../context/NotificationContext";

// Models
import type { NotificationProps } from "../types/notificationProps";

export const useNotification = () => {
    const dispatch = useContext(NotificationContext);

    return (props: {
        type: "success" | "warning" | "error";
        title: number | string;
        message: string;
    }) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: randomId(),
                ...props,
            } as NotificationProps,
        });
    };
};
