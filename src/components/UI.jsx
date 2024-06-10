import { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import "../ui.css";
import image1 from "../assets/RdDzynsLEO_AI5682-removebg.png";
import image2 from "../assets/Ctby_harsha-removebg-preview.png";

export const UI = ({ hidden, ...props }) => {
  //input value in the input field in ui
  const input = useRef();

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  //intializing the  values of the usechat context
  const {
    chat,
    loading,
    cameraZoomed,
    setCameraZoomed,
    message,
    slideChat,
    setSlideChat,
    questiontext,
    setQuestionText,
    answertext,
  } = useChat();

  //sending message to backend for response
  const sendMessage = () => {
    const text = input.current.value;
    setQuestionText(text);
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) {
    return null;
  }

  //used for full screen toggle
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  };

  //button toggle for slider and !slider
  const [imagebt, setImagebt] = useState("800px");
  const [inputbt, setInputbt] = useState(650);
  const [buttonsbt, setButtonsbt] = useState(720);
  const [crbyhbt, setCrbyhbt] = useState("650px");

  //useEffect for the toggle of slidechat
  useEffect(() => {
    if (slideChat) {
      setImagebt("1220px");
      setInputbt(950);
      setButtonsbt(1120);
      setCrbyhbt("950px");
    } else {
      setImagebt("810px");
      setInputbt(550);
      setButtonsbt(720);
      setCrbyhbt("550px");
    }
  }, [slideChat]);

  //React Speech to text using speech webkitSpeechRecognition
  const recognition = useRef(new window.webkitSpeechRecognition());

  useEffect(() => {
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      console.log("Transcript:", currentTranscript);
      setTranscript(currentTranscript);
    };

    recognition.current.onend = () => {
      const finalTranscript = transcript; // Capture the current value of transcript
      if (!loading && !message && finalTranscript.trim() !== "") {
        console.log("Final transcript:", finalTranscript);
        chat(finalTranscript);
        setQuestionText(finalTranscript);
        setTranscript(""); // Clear transcript after sending
      }
    };
  }, [loading, message, chat, transcript]);

  //fuction uses for the  start listening
  const startListening = () => {
    recognition.current.start();
    setIsListening(true);
  };

  //function uses for the  stop listening
  const stopListening = () => {
    recognition.current.stop();
    setIsListening(false);
  };

  //useEffect uses for start listening and stop listening
  useEffect(() => {
    if (hidden) {
      return;
    }
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening]);

  //Ui component for interface of the leo ai assitant 2.0
  return (
    <>
      {slideChat && (
        <div
          className="main"
          style={{
            position: "relative",
            left: 800,
            bottom: 550,
            width: "400px",
            height: "400px",
            alignItems: "center",
            gap: 5,
            paddingTop: 5,
            backgroundColor: "black",
            borderRadius: "15px",
            border: "3px solid red",
          }}
        >
          <div>
            <div className="SlideChat">
              <svg
                style={{ position: "relative", left: "15px", top: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="red"
                class="bi bi-0-circle-fill para1"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895" />
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.012 4.158c1.858 0 2.96-1.582 2.96-3.99V7.84c0-2.426-1.079-3.996-2.936-3.996-1.864 0-2.965 1.588-2.965 3.996v.328c0 2.42 1.09 3.99 2.941 3.99" />
              </svg>
              <p
                style={{
                  fontSize: "18px",
                  color: "gold",
                  position: "relative",
                  bottom: "20px",
                  left: "40px",
                  width: "350px",
                }}
              >
                {questiontext}
              </p>
            </div>
            <svg
              style={{ position: "relative", left: "15px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="gold"
              class="bi bi-reply-all-fill para2"
              viewBox="0 0 16 16"
            >
              <path d="M8.021 11.9 3.453 8.62a.72.72 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
              <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945l-.042.028a.147.147 0 0 0 0 .252l.042.028 4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106" />
            </svg>
            <div class="lead content">
              <p className="answer">{answertext}</p>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 4,
        }}
      >
        <div
          style={{
            position: "relative",
            bottom: imagebt,
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <a href="http://localhost:5173/">
            <img src={image1} alt="" width={250} height={250} />
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
            position: "relative",
            bottom: buttonsbt,
            right: -1100,
            alignItems: "flex-end",
            justifyItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            style={{
              pointerEvents: "auto",
              backgroundColor: "gold",
              border: "3px solid red",
              padding: 4,
              borderRadius: 4,
            }}
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-zoom-out"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-zoom-in"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            )}
          </button>
          <button
            onClick={() => setSlideChat(!slideChat)}
            style={{
              pointerEvents: "auto",
              backgroundColor: "gold",
              border: "3px solid red",
              padding: 3,
              borderRadius: 4,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>

          <button
            onClick={toggleFullScreen}
            style={{
              pointerEvents: "auto",
              backgroundColor: "gold",
              border: "3px solid red",
              padding: 3,
              borderRadius: 4,
            }}
          >
            {isFullScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-minimize"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
                className="feather feather-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            )}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            gap: 4,
            pointerEvents: "auto",
            maxWidth: "640px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            bottom: inputbt,
          }}
        >
          <button
            onClick={() => setIsListening(!isListening)}
            style={{
              pointerEvents: "auto",
              backgroundColor: "gold",
              border: "3px solid red",
              padding: 3,
              borderRadius: 4,
            }}
          >
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke:inecap="round"
                strokeLinejoin="round"
                className="feather feather-mic-off"
              >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mic"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            )}
          </button>
          <span class="input">
            <input
              placeholder="Type a message..."
              ref={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <span></span>
          </span>
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className="send"
            //loading || message ? "cursor-not-allowed opacity-30" : ""
          >
            Send
          </button>
        </div>
        <a
          href="https://www.linkedin.com/in/g-kedarinadh-sai-harsha-7b39b8256/"
          target="_blank"
        >
          <div
            style={{ position: "relative", bottom: crbyhbt, left: "1200px" }}
          >
            <img src={image2} alt="" width={250} height={40} />
          </div>
        </a>
      </div>
    </>
  );
};
