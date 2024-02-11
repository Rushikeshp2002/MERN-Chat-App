
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const messageRoute = require ('./routes/messageRoutes')
const socket = require('socket.io')
const path = require('path');

const app = express();
require("dotenv").config();

app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"public","dist")));
    res.sendFile(path.resolve(__dirname,"public","dist","index.html"));
});

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connection established")
})
.catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});

const io = socket(server,{
    cor:{
        origin: "http://localhost:5173",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on('connect', (socket)=>{
    global.chatSocket = socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    });
    socket.on('send-msg',(data)=>{
        console.log("sendmsg",{data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-received",data.messages);
        }
    })

})