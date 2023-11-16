import React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import io from "socket.io-client";
import { sendMessage } from "../../api_calls/Chat";

const socket = io("http://18.221.152.21:5000");
// const socket = io("http://localhost:5000");

const ChatFooter = (props: any) => {
  const [typedMessage, setTypedMessage] = React.useState("");
  // const [messages, setMessages] = React.useState<string[]>([]);
  // const [unsentMessage, setUnsentMessages] = React.useState<any>([]);
  const chatId = props.chatId;
  const id = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("userToken");

  useEffect(() => {
    // Join the chat room when the component mounts
    socket.emit("joinChat", chatId);
    //Listen for incoming messages
    // socket.on("sendMessage", (message) => {
    //   setMessages([...messages, message]);
    // });

    // console.log("messages: ", messages);
    // return () => {
    //   // Clean up when the component unmounts
    //   socket.disconnect();
    // };
  }, [chatId]);

  const changeMessageBoxHandler = (e: any) => {
    setTypedMessage(e.target.value);
  };

  const sendMessageHandler = (e: any) => {
    e.preventDefault();
    if (typedMessage) {
      sendMessage(chatId, id, typedMessage, token)
        .then((res: any) => {
          // if (unsentMessage.length > 0) {
          //   unsentMessage.forEach((element: any) => {
          //     sendMessage(chatId, id, element, token);
          //   });
          //   setUnsentMessages([]);
          //   console.log(unsentMessage);
          // }
          console.log("res: ", res);
        })
        .catch((err: any) => {
          console.log(err)
          props.setUnsentMessage((prevMessages: any) => [
            ...prevMessages,
            typedMessage,
          ]);
        });
      socket.emit("sendMessage", typedMessage, chatId);
    }
    setTypedMessage("");
    props.setChatUpdate(!props.chatUpdate);
  };

  return (
    <Box
      className="chatFooter"
      sx={{ p: { lg: "3.8px 10px", xs: "6px 10px" }, background: "#fff" }}
    >
      <Box
        component="form"
        onSubmit={sendMessageHandler}
        sx={{ display: "flex", gap: "10px" }}
      >
        <Box sx={{ width: "90%" }}>
          <input
            type="text"
            placeholder="Send Message"
            onChange={changeMessageBoxHandler}
            value={typedMessage}
            style={{
              outline: "none",
              border: "1px solid rgba(0,0,0,0.2)",
              padding: "10px 15px",
              borderRadius: "10px",
              width: "100%",
            }}
          />
        </Box>
        <Box className="sendMessageButton">
          <Button
            variant="contained"
            type="submit"
            sx={{ background: "#1b9ad1" }}
          >
            Send
          </Button>
        </Box>
        {/* <Box>{typedMessage}</Box> */}
      </Box>
    </Box>
  );
};

export default ChatFooter;
