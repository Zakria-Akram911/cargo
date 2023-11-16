import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [feedback, setFeedback] = useState("");
  const [emotion, setEmotion] = useState("");
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log(feedback);
    const data = {
      feedback: feedback,
    };

    console.log(data);
    axios
      .post("http://localhost:3000/feedback", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        const resultOfAnalysis = res.data.sentiment_score;
        if (resultOfAnalysis < 0) {
          setEmotion("UnHappy");
        } else if (resultOfAnalysis === 0) {
          setEmotion("Neutral");
        } else {
          setEmotion("Happy");
        }
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <>
      <section className="feedback">
        <div className="container">
          <form className="form" onSubmit={onSubmitHandler}>
            <div className="title">
              <h2>Event Feedback ????</h2>
            </div>
            <div>
              <textarea
                cols={20}
                rows={5}
                id="feedbacktext"
                placeholder="Write..."
                onChange={(e: any) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button id="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>

      <div>
        <p>{emotion}</p>
      </div>
    </>
  );
}

export default App;
