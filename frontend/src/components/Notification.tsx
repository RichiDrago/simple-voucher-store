import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Dispatch } from "react";
import type { NotificationProps } from "../types/notificationProps";

// Icons
import success_icon from "/icons/notification/success.png";
import warning_icon from "/icons/notification/warning.png";
import error_icon from "/icons/notification/error.png";

const Notification = ({
    id,
    title,
    type,
    message,
    dispatch,
}: NotificationProps & {
    dispatch: Dispatch<{
        type: "ADD_NOTIFICATION" | "REMOVE_NOTIFICATION";
        payload: NotificationProps;
    }>;
}) => {
    const { t } = useTranslation();
    // States
    const [width, setWidth] = useState<number>(0);
    const [timers, setTimers] = useState<ReturnType<typeof setInterval>[]>([]);

    const handleStartTimer = () => {
        const timer = setInterval(() => {
            setWidth((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 0.5;
            });
        }, 20);

        setTimers([...timers, timer]);
    };

    const handlePauseTimer = () => {
        clearInterval(timers.pop());
    };

    useEffect(() => {
        const handleCloseNotification = () => {
            dispatch({
                type: "REMOVE_NOTIFICATION",
                payload: {
                    id,
                    title,
                    type,
                    message,
                },
            });
        };

        if (width !== 100) return;

        handleCloseNotification();
    }, [width, dispatch, id, title, type, message]);

    useEffect(() => {
        handleStartTimer();
    }, []);

    useEffect(() => {
        if (timers.length > 1) {
            clearInterval(timers.pop());
        }
    }, [timers]);

    return (
        <div
            onMouseEnter={handlePauseTimer}
            onMouseLeave={handleStartTimer}
            className={
                `mb-2 transform overflow-hidden rounded-xl shadow-xl transition-all duration-300 ${
                    type === "success"
                        ? "bg-green-100 text-green-900"
                        : type === "warning"
                          ? "bg-yellow-100 text-yellow-900"
                          : "bg-red-100 text-red-900"
                }` + (width === 100 && " ml-[100%]")
            }
        >
            {/* Notification body */}
            <div className="flex px-4 py-3">
                {/* Icon */}
                <div className="me-5 flex items-center justify-center py-1">
                    {type === "success" ? (
                        <img src={success_icon} alt="success icon" className="h-9 min-w-9" />
                    ) : type === "warning" ? (
                        <img src={warning_icon} alt="warning icon" className="h-10 min-w-10" />
                    ) : (
                        <img src={error_icon} alt="error icon" className="h-8 min-w-8" />
                    )}
                </div>
                {/* Text */}
                <div>
                    <p className={`font-bold ${type === "success" ? "text-green-500" : type === "warning" ? "text-yellow-500" : "text-red-500"}`}>
                        {t(`notification.codes.${title}`)}
                    </p>
                    <p className={`text-sm ${type === "success" ? "text-green-900" : type === "warning" ? "text-yellow-900" : "text-red-900"}`}>
                        {t(`notification.${type}.${message}`)}
                    </p>
                </div>
            </div>
            {/* Loading bar */}
            <div
                className={`h-[5px] ${type === "success" ? "bg-green-500" : type === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: width + "%" }}
            ></div>
        </div>
    );
};

export default Notification;
