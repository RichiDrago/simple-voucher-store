import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

// Models
import type { NotificationProps } from "../types/notificationProps";

// Components
import Notification from "../components/Notification";

export const NotificationContext = createContext<
    Dispatch<{
        type: "ADD_NOTIFICATION" | "REMOVE_NOTIFICATION";
        payload: NotificationProps;
    }>
>(() => {});

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        (
            state: NotificationProps[],
            action: {
                type: "ADD_NOTIFICATION" | "REMOVE_NOTIFICATION";
                payload: NotificationProps;
            }
        ) => {
            switch (action.type) {
                case "ADD_NOTIFICATION":
                    return [...state, { ...action.payload }];
                case "REMOVE_NOTIFICATION":
                    return state.filter((notification: NotificationProps) => notification.id !== action.payload.id);
                default:
                    return state;
            }
        },
        []
    );

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="fixed top-4 right-4 z-50 max-w-[500px] min-w-[300px]">
                {state.map((notification: NotificationProps) => (
                    <Notification key={notification.id} {...notification} dispatch={dispatch} />
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    );
}
