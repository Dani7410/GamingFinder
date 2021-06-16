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

app.get("/channelView", (req, res) => {
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



//MiddlWare -->
// app.use((req,res,next) => {
//     res.status(503).send('site is down check back soon')
//     next()
// })

// -- example of how toJSON works
// const pet = {
//     name: 'hal'
// }

// pet.toJSON = function () {

//     return {}
//     // console.log(this);
//     // return this
// }

// console.log(JSON.stringify(pet));



//----DB noter ---
//Used to administer .env files in our applications - Used as a part of db connection
// dotenv.config()

// //Connect with the mongoDB Cluster
// const dbURI = "mongodb+srv://"+process.env.USER+":"+process.env.PASS+"@cluster0.ktewt.mongodb.net/GamePortal?retryWrites=true&w=majority"

// // this is acturly a async task. it goes out and takes some time to do and therefore it returns something like a promise.
// // so we can attatch a then method to it, "this action is handled after the connection to the database have been made."
// // we dont want the app to start listening for requests on port 3000 before the connection to the database have been made, and if placed in the then method will connect first then listen.
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// // .then((result) => app.listen(3000))
// // .catch((err) => console.log(err));


// --- MiddlewAre noter ---
// app.use((req, res, next) =>{
//     if(req.method === 'GET'){
//         res.send('GET request disabled')
//     }else{
//         next()
//     }


    //middleware: Stops the request for until the middleware has been fulfilled 
    // console.log(req.method, req.path);
    // next()
// })

// app.use((req,res,next) => {
//     res.status(503).send('site is down check back soon')
//     next()
// })


//--- Hashing ---
//Example of how hashing works

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }



// daniel -> fjjkndfksd -> daniel **unhashed
// daniel -> sldkfklsfdklmfs ** hashed


//--- AuthToken --- 
//example of how auth token works
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123'}, 'somethingworks', {expiresIn: '7d'})
//     console.log(token);

//     const data = jwt.verify(token, 'somethingworks')
//     console.log(data);
// }

// myFunction()

//middelware

//without middleware new request -> run router handler

//with middles new request -> do something -> run router handler

