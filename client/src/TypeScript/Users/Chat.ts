import axios from "axios";
export const sendMessage = async (message: string) => {
  const result = await axios.post(
    `http://localhost:8080/chat/newMessage`,
    message
  );
  result;
};
