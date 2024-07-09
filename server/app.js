import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import cors from "cors"

const app = express();
const server = new createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})
const port = 4000;

io.on("connection", (socket) => {
    console.log("User is connected:", socket.id)
    socket.on("message", (data)=>{console.log(data)})
    socket.emit("welcome", `Welcome from backend ${socket.id}`)
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))
app.get("/", (req,res)=>{
    res.send("hello from socket.io")
})

server.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})