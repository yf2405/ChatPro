import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, getAllMessageGroupRoute } from "../../utils/APIRoutes";


export default function GroupChatContainer({ currentGroup, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("chat-app-user"));
        const response = await axios.post(getAllMessageGroupRoute, {
          from: data._id,
          to: currentGroup._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentGroup]);

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(localStorage.getItem("chat-app-user"));
    socket.current.emit("send-group-msg", {
      groupId: currentGroup._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentGroup._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("group-msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="group-details">
          <div className="group-name">
            <h3>{currentGroup.name}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                {!message.fromSelf && <h4>{message.sender}</h4>}
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  // Estilos del contenedor
`;
