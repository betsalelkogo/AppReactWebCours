import apiClient from "./ClientApi";

const getAllMessage = async () => {
  return apiClient.get("/message");
};
const getMessageById = async (messageId: String) => {
  return apiClient.get("/message/" + messageId, messageId);
};

const addNewMessage = async (messageJson: any) => {
  return apiClient.post("/message", messageJson);
};

export default {
  getAllMessage,
  addNewMessage,
  getMessageById,
};
