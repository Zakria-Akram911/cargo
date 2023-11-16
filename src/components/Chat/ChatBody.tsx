import { Grid, Typography, Box, Button } from "@mui/material";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "@mui/material/Modal";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  acceptProvider,
  getAllServiceRequestByUser,
} from "../../api_calls/SerivceRequest";
import { styled } from "@mui/material/styles";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
// import { fetchChatById } from "../../api_calls/Chat";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: "10px",
  "&:not(:last-child)": {
    borderBottom: "1px solid rgba(0,0,0,0.3)",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#fafafa",
  // "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "block",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: { xs: "90%", lg: 800 },
  width: { sx: "90%", lg: 800 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: { xs: "60vh", md: "auto" },
  maxHeight: { xs: "80vh", lg: "80vh" },
  overflowY: "auto",
};

const ChatBody = (props: any) => {
  const bodyRef = useRef<any>();
  // const { id } = useParams();
  const id = window.localStorage.getItem("userId");
  const role = window.localStorage.getItem("role");
  // const username = window.localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("proops", props);
  // const chatId = props.chatId;
  // const token = window.localStorage.getItem("userToken");
  // console.log(props);

  const handleChange =
    (panel: string) => (event: any, newExpanded: boolean) => {
      event.preventDefault();
      setExpanded(newExpanded ? panel : false);
    };

  useLayoutEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  });

  useEffect(() => {
    getAllServiceRequestByUser()
      .then((res) => setData(res.data))
      .catch((err: any) => err);
  }, [open]);

  const onAcceptProviderHandle = (e: any) => {
    e.preventDefault();
    const serviceId = e.target.value;
    acceptProvider(serviceId, props.userName)
      .then((res) => res)
      .catch((err: any) => err);
    setOpen(false);
  };

  // console.log(chatId);

  // useEffect(() => {
  //   fetchChatById(chatId, token)
  //     .then((res) => console.log(res))
  //     .catch((err: any) => console.log(err));
  // }, []);

  // console.log(props.chatData);
  return (
    <>
      <header style={{ background: "#e5e5e5", padding: "10px 30px" }}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} sm={6}>
            <Grid container sx={{ columnGap: "10px", alignItems: "center" }}>
              <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                <ArrowBackIcon
                  sx={{ color: "black" }}
                  onClick={() => props.setShowChat(false)}
                />
              </Grid>
              <Grid item>
                {/* <Box
              component="img"
              src={userImage}
              sx={{ width: "40px", borderRadius: "50%" }}
            /> */}
                <PersonIcon sx={{}} />
              </Grid>
              <Grid item>
                <Typography
                  paragraph
                  sx={{ fontWeight: "600", marginBottom: "0" }}
                >
                  {role === "user"
                    ? `${props.businessName}`
                    : `Anonymous ${props.userName}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <Box component="form">
              {role !== "provider" && (
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{ background: "#1b9ad1" }}
                  size="small"
                >
                  Accept this provider
                </Button>
              )}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {data?.map((item: any) => (
                    <>
                      {item.status === "searching" && (
                        <Accordion
                          expanded={expanded === `panel${item.id}`}
                          onChange={handleChange(`panel${item.id}`)}
                          key={item.id}
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", md: "row" },
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h3"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  <strong> {item.category}/ </strong>
                                  {item.service}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: { xs: "start", lg: "center" },
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", md: "row" },
                                    gap: "10px",
                                    mt: "10px",
                                  }}
                                >
                                  {/* <Box>
                                    <Typography>
                                      <strong>Budget: </strong>${item.budget}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography>
                                      <strong>Timeframe: </strong>
                                      {item.timeframe} days
                                    </Typography>
                                  </Box> */}
                                </Box>
                              </Box>
                              <Box>
                                <Typography
                                  paragraph
                                  sx={{
                                    fontSize: "14px",
                                    color: "rgba(0,0,0,0.8)",
                                    mb: "0",
                                    textAlign: { xs: "left", lg: "right" },
                                  }}
                                >
                                  {item.createdAt}
                                </Typography>
                                <Box
                                  sx={{
                                    mt: { lg: "10px", xs: "0px" },
                                  }}
                                >
                                  {/* <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "end",
                          }}
                        >
                          <Button
                            variant="contained"
                            value={item.id}
                            onClick={cancelClickHandle}
                          >
                            Cancel
                          </Button>
                          <Button variant="contained">Re-request</Button>
                        </Box> */}
                                  <Box sx={{ textAlign: "right", mt: "10px" }}>
                                    <Typography>
                                      <strong>Status: </strong>
                                      {item.status === "found" ||
                                      item.status === "searching" ? (
                                        <span
                                          style={{
                                            color: "#4bb543",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.status}
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: "red",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.status}
                                        </span>
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                              <Typography paragraph>
                                {item.description}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  justifyContent: "end",
                                }}
                              >
                                {/* <Button
                              variant="contained"
                              value={item.id}
                              onClick={cancelClickHandle}
                              disabled={
                                item.status === "searching" ? false : true
                              }
                              // disabled={false}
                            >
                              Cancel
                            </Button> */}
                                <Button
                                  variant="contained"
                                  disabled={
                                    item.status === "searching" ? false : true
                                  }
                                  onClick={onAcceptProviderHandle}
                                  value={item.id}
                                >
                                  Accept
                                </Button>
                              </Box>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </>
                  ))}
                </Box>
              </Modal>
            </Box>
          </Grid>
          {/* <Grid item sx={{ display: { xs: "block", md: "none" } }}>
            <ArrowBackIcon
              sx={{ color: "black" }}
              onClick={() => props.setShowChat(false)}
            />
          </Grid>
          <Grid item>
            <PersonIcon sx={{}} />
          </Grid>
          <Grid item>
            <Typography paragraph sx={{ fontWeight: "600", marginBottom: "0" }}>
              Anonymous {props.userName}
            </Typography>
          </Grid> */}
        </Grid>
      </header>
      <Box
        ref={bodyRef}
        className="messageContainer"
        sx={{
          padding: "10px 20px",
          maxHeight: { lg: "66.8vh", sm: "83.5vh", xs: "80.1vh" },
          minHeight: { lg: "66.8vh", sm: "83.5vh", xs: "80.1vh" },
          overflowY: "auto",
          overflowX: "hidden",
          background: "white",
        }}
      >
        {/* messages delivered by you */}
        <Box className="messageChat">
          {props.chatData.map((text: any, index: number) =>
            text.sender == id ? (
              <>
                <Box
                  className="messageSender"
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      marginBottom: "0",
                      fontSize: "14px",
                      background: "#1b9ad1",
                      mb: "10px",
                      p: "5px 10px",
                      borderRadius: "10px",
                      maxWidth: "400px",
                      width: "fit-content",
                      color: "#fafafa",
                    }}
                  >
                    {text.text}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box
                className="messageReciever"
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    marginBottom: "0",
                    fontSize: "14px",
                    display: "inline-block",
                    background: "rgba(0,0,0,0.3)",
                    mb: "10px",
                    p: "5px 10px",
                    borderRadius: "10px",
                    maxWidth: "300px",
                    width: "fit-content",
                  }}
                >
                  {text.text}
                </Typography>
              </Box>
            )
          )}

          {props.unsentMessage?.length > 0 &&
            props.unsentMessage?.map((text: any) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "end",
                    position: "relative",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      marginBottom: "0",
                      fontSize: "14px",
                      background: "#1b9ad1",
                      mb: "10px",
                      p: "5px 10px",
                      borderRadius: "10px",
                      maxWidth: "400px",
                      width: "fit-content",
                      color: "#fafafa",
                    }}
                  >
                    {text}
                  </Typography>
                  <HistoryOutlinedIcon
                    sx={{
                      fontSize: "14px",
                      position: "absolute",
                      bottom: "10px",
                      right: "-15px",
                    }}
                  />
                </Box>
              </>
            ))}
          {/* <Typography
              paragraph
              sx={{
                marginBottom: "0",
                fontSize: "14px",
                background: "rgba(0,128,0,0.4)",
                mb: "10px",
                p: "5px 10px",
                borderRadius: "10px",
                maxWidth: "400px",
                width: "fit-content",
              }}
            >
              Hey, How are you? Hey, How are you? Hey, How are you? Hey, How are
              you? Hey, How are you? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Expedita vitae, a modi et ratione minima
              dignissimos officia vel harum, vero tempore tenetur autem quis
              itaque cupiditate esse, impedit voluptates maxime. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Cupiditate, unde.
              Harum dignissimos deleniti ipsum sequi alias, consectetur
              voluptates, non nisi omnis odit esse libero nesciunt ea officia
              dolorum praesentium voluptatibus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nulla autem voluptas excepturi. Et
              debitis provident cupiditate itaque molestiae dolore corrupti vel
              ut, maiores aut minus sequi alias at hic nisi.
            </Typography> */}
          {/* <Typography
              paragraph
              sx={{
                marginBottom: "0",
                fontSize: "14px",
                background: "rgba(0,128,0,0.4)",
                mb: "10px",
                p: "5px 10px",
                borderRadius: "10px",
                maxWidth: "300px",
                width: "fit-content",
              }}
            >
              Hey, How are you?
            </Typography> */}
        </Box>

        {/* Message sent by the other user */}
        {/* <Box
          className="messageChat"
          sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}
        >
          <Box
            className="messageReciever"
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Typography
              paragraph
              sx={{
                marginBottom: "0",
                fontSize: "14px",
                display: "inline-block",
                background: "rgba(0,0,0,0.3)",
                mb: "10px",
                p: "5px 10px",
                borderRadius: "10px",
                maxWidth: "300px",
                width: "fit-content",
              }}
            >
              I am fine. How are you? Hey, How are you? Hey, How are you? Hey,
              How are you? Hey, How are you? Hey, How are you? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Expedita vitae, a modi et
              ratione minima dignissimos officia vel harum, vero tempore tenetur
              autem quis itaque cupiditate esse, impedit voluptates maxime.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, unde. Harum dignissimos deleniti ipsum sequi alias,
              consectetur voluptates, non nisi omnis odit esse libero nesciunt
              ea officia dolorum praesentium voluptatibus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Nulla autem voluptas excepturi.
              Et debitis provident cupiditate itaque molestiae dolore corrupti
              vel ut, maiores aut minus sequi alias at hic nisi.
            </Typography>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default ChatBody;
