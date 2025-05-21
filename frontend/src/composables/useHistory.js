import { ref } from "vue";
import { io } from "socket.io-client";

export function useHistory(id) {
  const history = ref([]);
  const historyError = ref([]);
  const SOCKET_URL = import.meta.env.VITE_APP_URL; // Lấy URL từ .env
  const socket = io(SOCKET_URL);

  // Gửi request lấy dữ liệu ngay lập tức
  socket.emit("getHistory", id);

  // Lắng nghe các events
  socket.on("HistoryData", (data) => {
    console.log("Received history:", data);
    history.value = data;
  });

  socket.on("HistoryError", (message) => {
    historyError.value = message;
  });

  socket.on("HistoryUpdate", () => {
    socket.emit("getHistory", id);
  });

  socket.on("connect", () => console.log("Socket connected:", socket.id));
  socket.on("disconnect", () => console.log("Socket disconnected"));

  // Cleanup function
  const cleanup = () => {
    if (socket) {
      socket.off("HistoryData");
      socket.off("HistoryError");
      socket.off("HistoryUpdate");
      socket.disconnect();
    }
  };

  return { history, historyError, cleanup };
}
