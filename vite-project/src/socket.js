import { io } from "socket.io-client";

export const initSocket = async () => {
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };

    
    const URL = import.meta.env.REACT_APP_BACKEND_URL || ""; 
    console.log("🌐 Connecting to backend:", URL || "Current Host");

    return io(URL, options);
};