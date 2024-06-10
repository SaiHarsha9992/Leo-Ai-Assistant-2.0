import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setLoading(true);
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
    setAnswerText("");
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [slideChat, setSlideChat] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [questiontext, setQuestionText] = useState("");
  const [answertext, setAnswerText] = useState("");
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
    console.log(messages[0].text);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
        slideChat,
        setSlideChat,
        questiontext,
        setQuestionText,
        answertext,
        setAnswerText,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
