import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

export function useRooms() {
  const rooms = ref([]);
  const roomsError = ref([]);
  const SOCKET_URL = import.meta.env.VITE_APP_URL; // Lấy URL từ .env
  const socket = io(SOCKET_URL);
  onMounted(() => {
    socket.emit("getRooms");
    socket.on("RoomsData", (data) => {
      console.log("Received rooms:", data);
      rooms.value = data;
    });
    socket.on("RoomsError", (message) => {
      roomsError.value = message;
    });
    socket.on("RoomsUpdate", () => {
      socket.emit("getRooms");
    });

    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  });

  onUnmounted(() => {
    if (socket) socket.disconnect();
  });

  return { rooms, roomsError };
}