import { Box, Grid, Typography } from "@mui/material";
import ChatBar from "../../components/Chat/ChatBar";
import ChatBody from "../../components/Chat/ChatBody";
import ChatFooter from "../../components/Chat/ChatFooter";
import React, { useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { fetchChatById, sendMessage } from "../../api_calls/Chat";
import io from "socket.io-client";
// import NotificationModal from "../../components/NotificationModal";
import { useLocation } from "react-router-dom";
// import moment from "moment";
const socket = io("http://18.221.152.21:5000");

const Chats = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("chatId");

  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [chatId, setChatId] = React.useState("");
  const [showChat, setShowChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>([]);
  const [userName, setUserName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [chatUpdate, setChatUpdate] = React.useState(true);
  const token = window.localStorage.getItem("userToken");
  const id = window.localStorage.getItem("userId");
  const [messages, setMessages] = React.useState<any>([]);
  const [unsentMessage, setUnsentMessage] = React.useState<any>([]);
  const [socketConnect, setSocketConnect] = React.useState(false);
  // const [timestamp, setTimestamp] = React.useState("");
  // console.log(chatUpdate);
  // useEffect(() => {
  //   if (chatId !== "") {
  //     fetchChatById(chatId, token)
  //       .then((res: any) => setChatData(res.data.messages))
  //       .catch((err: any) => console.log(err));
  //   }
  // }, [chatId]);

  useEffect(() => {
    if (chatId !== "") {
      fetchChatById(chatId, token)
        .then((res: any) => setChatData(res.data.messages))
        .catch((err: any) => console.log(err));

      console.log(chatData);
      // setTimestamp(chatData[chatData.length - 1]?.timestamp);
    } else {
      fetchChatById(param1, token)
        .then((res: any) => setChatData(res.data.messages))
        .catch((err: any) => console.log(err));
    }
    // //Listen for incoming messages
    // socket.on("message", (message: any) => {
    //   console.log("message89089");
    //   setMessages([...messages, message]);
    // });
    // socket.emit("joinChat", chatId);
    // socket.on("sendMessage", (data: any) =>
    //   setChatData((prevData: any) => [...prevData, data])
    // );
    // setShowChat(true);
    // console.log("useEffect ran!");
  }, [chatUpdate, chatId, messages, param1]);

  socket.on("connect", () => {
    // if (unsentMessage.length > 0) {
    //   unsentMessage.forEach((element: any) => {
    //     sendMessage(chatId, id, element, token)
    //       .then((res) => console.log("res:", res))
    //       .catch((err) => console.log("first"));
    //   });
    //   setUnsentMessage([]);
    // }
    setSocketConnect(!socketConnect);
  });

  useEffect(() => {
    //Listen for incoming messages
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
    if (unsentMessage.length > 0) {
      unsentMessage.forEach((element: any) => {
        console.log("element", element);
        sendMessage(chatId, id, element, token)
          .then((res) => console.log("res:", res))
          .catch((err) => console.log("first", err));
      });
      setUnsentMessage([]);
    }
  }, [messages, socketConnect]);

  // console.log("socket targeted: ", socketConnect);
  // console.log("unsentMessage", unsentMessage);
  // console.log("chatData", chatData);
  // console.log(chatData[chatData.length - 1]);
  // console.log(timestamp);
  // console.log(moment(timestamp).local().format("hh:mm"));
  // console.log(chatData);
  console.log(userName);
  return (
    <>
      {/* For Desktop Screens */}
      <Box sx={{ display: { md: "inherit", xs: "none" } }}>
        <Box sx={{ maxWidth: "90%", m: "0 auto", mt: "20px" }}>
          <Grid container>
            <Grid item lg={3} xs={12}>
              <ChatBar
                setChatId={setChatId}
                paramsId={param1}
                setUserName={setUserName}
                setShowChat={setShowChat}
                chatUpdate={chatUpdate}
                setBusinessName={setBusinessName}
              />
            </Grid>
            {showChat ? (
              <Grid
                item
                lg={9}
                xs={12}
                sx={{ minHeight: "81vh" }}
                className="chatCotent"
              >
                <Grid container sx={{ flexDirection: "column" }}>
                  <Grid
                    item
                    sx={{
                      maxHeight: "74.2vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <ChatBody
                      chatId={chatId}
                      chatData={chatData}
                      setShowChat={setShowChat}
                      userName={userName}
                      unsentMessage={unsentMessage}
                      businessName={businessName}
                    />
                  </Grid>
                  <Grid item sx={{}}>
                    <ChatFooter
                      chatId={chatId}
                      setChatUpdate={setChatUpdate}
                      chatUpdate={chatUpdate}
                      setUnsentMessage={setUnsentMessage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                item
                lg={9}
                xs={12}
                sx={{ minHeight: "81vh" }}
                className="chatCotent"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    minHeight: "81vh",
                    rowGap: "10px",
                  }}
                >
                  <Box
                    sx={{ p: "30px", borderRadius: "50%", background: "black" }}
                  >
                    <ChatIcon sx={{ fontSize: "100px", color: "white" }} />
                  </Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                    Click on the provider to chat with him!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      {/* For Mobile screens */}
      <Box sx={{ display: { md: "none", xs: "block" } }}>
        <Box
          sx={{ maxWidth: "100%", m: "0 auto", mt: { xs: "0px", lg: "10px" } }}
        >
          <Grid container>
            {showChat === false && (
              <Grid item lg={3} xs={12}>
                <ChatBar
                  setChatId={setChatId}
                  setUserName={setUserName}
                  setBusinessName={setBusinessName}
                  setShowChat={setShowChat}
                  chatUpdate={chatUpdate}
                />
              </Grid>
            )}
            {showChat && (
              <Grid
                item
                lg={9}
                xs={12}
                sx={{ minHeight: "82vh" }}
                className="chatCotent"
              >
                <Grid container sx={{ flexDirection: "column" }}>
                  <Grid
                    item
                    sx={{
                      minHeight: "83vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <ChatBody
                      chatId={chatId}
                      chatData={chatData}
                      setShowChat={setShowChat}
                      userName={userName}
                      unsentMessage={unsentMessage}
                      businessName={businessName}
                    />
                  </Grid>
                  <Grid item sx={{}}>
                    <ChatFooter
                      chatId={chatId}
                      setChatUpdate={setChatUpdate}
                      chatUpdate={chatUpdate}
                      setUnsentMessage={setUnsentMessage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Chats;
