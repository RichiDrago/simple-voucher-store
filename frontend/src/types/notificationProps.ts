export type NotificationProps = {
    id: string;
    type: "success" | "error" | "warning";
    title: number | string;
    message: string;
};
