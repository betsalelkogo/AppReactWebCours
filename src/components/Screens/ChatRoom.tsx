import { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

// @ Custom Components
import Title from "../Shared/Header";
import SendMessage from "../messages/SendMessage";
import ShowMessages from "../messages/MessageInfo";

// @ Utils, Types & Constants
import { Message } from "../../utils/types/@Message";
import socket from "../../utils/socket";

const ChatScreen = () => {
  const { userInfo } = useContext(AuthContext);

  const [roomId, setRoomId] = useState<string>("");
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string, userId: string) => {
    socket.emit("send_message", {
      message,
      userId,
    });
  };

  useEffect(() => {
    socket.on("res_messages", (messages: any) => {
      setCurrentMessages(messages);
    });
    return () => {
      socket.off("res_messages");
    };
  }, []);

  useEffect(() => {
    socket.on("new_messages", (data: any) => {
      if (data) {
        setCurrentMessages((prevState) => [...prevState, data]);
      }
    });
    return () => {
      socket.off("new_messages");
    };
  }, []);

  useEffect(() => {
    socket.auth = {
      token: `Bearer ${userInfo.accessToken}`,
    };
    socket.connect();
    const roomId = socket.id;
    setRoomId(socket.id);

    socket.emit("get_messages", roomId);

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <ShowMessages messages={currentMessages} />
        <SendMessage
          handleSendMessage={(val: string) =>
            handleSendMessage(val, userInfo.id)
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
