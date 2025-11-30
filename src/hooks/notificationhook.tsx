import {createContext, type Dispatch, type JSX, type ReactNode, type SetStateAction, useState} from "react";


interface NotificationContextProps {
    notifications: Notification[];
    setNotifications: Dispatch<SetStateAction<Notification[]>>;
}

interface Notification {
    from: string;
    message: string;
}

const notificationContext = createContext<NotificationContextProps | undefined>(undefined);


export default function NotificationProvider({children}: {children:ReactNode}): JSX.Element {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    return (
        <notificationContext.Provider value={{notifications, setNotifications}}>
            {children}
        </notificationContext.Provider>
    )
}
