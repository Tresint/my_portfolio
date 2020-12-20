const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const socket = require('socket.io');
const io = socket(server,{
    cors : {
        origin : 'http://localhost:3000',
        methods : ["GET","POST"]
    }
});
const user = require('./routes/user');
const review = require('./routes/review');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/user',user);
app.use('/review',review);

var users = 0;
//채팅
io.on("connection",(socket) => {

    users += 1;

    socket.on('chat-msg',(msg) => {
        console.log('message', msg)
        io.emit('chat-msg',msg)
    })

    socket.on('disconnect',()=>{
        console.log('접속 종료');
        users -= 1;
    })

    
    io.emit('user',users);

})

server.listen(5000, () => {
    console.log('server on 5000')
})