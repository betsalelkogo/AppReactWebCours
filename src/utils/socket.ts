import { io } from "socket.io-client";

const socket = io("http://192.168.150.4:3000");

export default socket;
