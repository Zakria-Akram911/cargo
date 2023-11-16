import axios from "axios";

// const userId = window.localStorage.getItem("userId");

export const fetchChats = async (token: any) => {
  const userId = window.localStorage.getItem("userId");
  const config = {
    headers: {
      "x-auth-token": `${token}`,
    },
  };
  const data = await axios
    .get(`http://localhost:5000/chat/fetch?userId=${userId}`, config)
    .then((res) => res)
    .catch((error) => {
      console.log(error);
    });
  return data;
};

export const fetchChatById = async (chatId: any, token: any) => {
  const config = {
    headers: {
      "x-auth-token": `${token}`,
    },
  };
  const data = await axios
    .get(`http://localhost:5000/chat/${chatId}/messages`, config)
    .then((res) => res)
    .catch((error) => console.log(error));
  return data;
};

export const sendMessage = async (
  chatId: any,
  senderId: any,
  text: any,
  token: any
) => {
  const config = {
    headers: {
      "x-auth-token": `${token}`,
    },
  };

  const data = await axios.post(
    "http://localhost:5000/chat/message",
    {
      chatId: chatId,
      sender: senderId,
      text: text,
    },
    config
  );
  // .then((res) => res)
  // .catch((error: any) => console.log(error));

  return data;
};
