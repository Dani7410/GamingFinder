const http = require('http')
const express = require("express");
const socketio = require('socket.io')
const Filter = require('bad-words')
const cookieParser = require("cookie-parser")
const fs = require("fs");
const authentication = require("./Middleware/auth")
require('dotenv').config();
require('./db/mongooseDB');


const app = express();
const server = http.createServer(app);
const io = socketio(server)


//Import with require to get our route
const dbUserRoute = require("./routes/DBuserRoute");
const dbGameRoute = require("./routes/DBgameRoute");
const dbChannelRoute = require("./routes/DBchannelRoute");




//App use middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


//App user for routing
app.use(dbUserRoute.router);
app.use(dbGameRoute.router);
app.use(dbChannelRoute.router);



// SerSsideRendring
const login = fs.readFileSync(__dirname + "/public/login/login.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const landingpage = fs.readFileSync(__dirname + "/public/landingPage/landingPage.html", "utf-8");
const userCreate = fs.readFileSync(__dirname + "/public/userCreate/userCreate.html", "utf-8");
const channel = fs.readFileSync(__dirname + "/public/channel/channel.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/profile/profile.html","utf-8");


//Html Routes

app.get("/", authentication, (req, res) => {
    res.send(header + landingpage + footer)
});

app.get("/login", (req, res) => {
    res.send(login)
});

app.get("/user/create", (req, res) => {
    res.send(userCreate)
});

app.get("/profile/me", authentication, (req, res) =>{
    res.send(header + profile + footer)
});

app.get("/channelView/:id", authentication, (req, res) => {
    res.send(channel)
});

io.on('connection', (socket) =>{
    console.log('New websocket connection')
    
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message, callback) =>{
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is now allowed!')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coords, callback) =>{
        io.emit('message', `http://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left')
    })


   

})

const PORT = process.env.PORT || 8080;
server.listen(PORT, error => {
    if(error){
        console.log(error);
    }
    console.log("server is running on port:", Number(PORT));
});
