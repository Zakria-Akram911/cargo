import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { fetchChats } from "../../api_calls/Chat";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";

const ChatBar = (props: any) => {
  const [chatData, setChatData] = React.useState<any>([]);
  // const { id } = useParams();
  const id = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("userToken");
  // const role = window.localStorage.getItem("role");
  // const username = window.localStorage.getItem("username");
  // const [timestamp, setTimestamp] = React.useState<any>("");

  useEffect(() => {
    if (props.paramsId &&  !isNaN(props.paramsId)) {
      props.setChatId(props.paramsId); 
      props.setShowChat(true);
    }
    
   
    
  }, [props.paramsId]);

  useEffect(() => {
    fetchChats(token)
      .then((res: any) => {
        setChatData(res.data);
        // setTimestamp(chatData[chatData.length - 1]?.updatedAt);
      })
      .catch((error: any) => console.log(error));
  }, [props.chatUpdate]);

  // console.log(props.timestamp);
  // console.log(timestamp);

  // console.log(chatData);
  // console.log(timestamp.moment())
  // console.log(moment(timestamp).local().format("hh:mm"));

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            background: "#e4e4e4",
            p: "10px",
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
          }}
        >
          All Chats:
        </Typography>
        <Box
          sx={{
            maxHeight: { lg: "81vh", xs: "auto" },
            height: { lg: "81vh", xs: "auto" },
            overflowY: "auto",
            overflowX: "hidden",
            background: "#e5e5e5",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "space-between",
            }}
            className="allMessagesChatBar"
          >
            {chatData.map((person: any) => (
              <Grid
                item
                key={person.id}
                xs={12}
                lg={12}
                sx={{
                  boxShadow: "-4px 3px 6px -2px rgba(0,0,0,0.2)",
                  p: "15px 20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.setChatId(person.id);
                  props.setShowChat(true);
                  person.user2 == id
                    ? props.setUserName(person.user1)
                    : props.setUserName(person.user2);

                  person.user2 == id
                    ? props.setBusinessName(person.user1)
                    : props.setBusinessName(person.businessName);
                }}
              >
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item>
                    <Grid
                      container
                      sx={{
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {/* <Box
                      component="img"
                      src={person.imgUrl}
                      sx={{ borderRadius: "50%", width: "40px" }}
                    /> */}
                      <PersonIcon sx={{ color: "black" }} />
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "18px", fontWeight: "500" }}
                      >
                        {person.user2 == id
                          ? `Anonymous ${person.user1}`
                          : person.businessName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ marginTop: { lg: "inherit", xs: "20px" } }}>
                    {moment(person.updatedAt).local().format("hh:mm A")}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ChatBar;
