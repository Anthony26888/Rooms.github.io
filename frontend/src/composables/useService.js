import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

export function useService() {
  const services = ref([]);
  const servicesError = ref([]);
  const SOCKET_URL = import.meta.env.VITE_APP_URL || "http://192.168.1.11:3000"; // Lấy URL từ .env
  const socket = io(SOCKET_URL);
  onMounted(() => {
    socket.emit("getServices");
    socket.on("ServicesData", (data) => {
      console.log("Received services:", data);
      services.value = data;
    });
    socket.on("ServicesError", (message) => {
      servicesError.value = message;
    });
    socket.on("ServicesUpdate", () => {
      socket.emit("getServices");
    });

    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  });

  onUnmounted(() => {
    if (socket) socket.disconnect();
  });

  return { services, servicesError };
}