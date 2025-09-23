import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    forceNew: true, // ✅ correct key
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'], // prefer websocket
  };

  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  console.log("🌐 Connecting to backend:", URL);

  return io(URL, options);
};
