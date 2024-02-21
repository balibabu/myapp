import { createContext, useState } from "react";

const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {
    const [fileShareSendProgress, setFileShareSendProgress] = useState(0);
    const [fileShareReceiveProgress, setFileShareReceiveProgress] = useState(0);
    const [notifications, setNotifications] = useState([]);

    function notify(title, content, bg = 'success') {
        setNotifications((prev) => [...prev, { title, content, bg, id: Date.now() }]);
    }

    const contextData = {
        fileShareSendProgress, setFileShareSendProgress,
        fileShareReceiveProgress, setFileShareReceiveProgress,
        notifications, setNotifications, notify, toastColor
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}

const toastColor = {
    danger: 'rgb(255,230,230)',
    success: '#c7f9cc',
    warning: '#ffee99',
    info: '#a2d2ff',
    inert: 'grey',
}