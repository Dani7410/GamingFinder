const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");
const Game = require("./models/game");
const User = require("./models/user");
const Channel = require("./models/channel");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config()

const app = express();

// bodyparser andvendes på app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// måde at bestemme hvilken router der skal håndtere hvilke kald.
// app.use("/data" , dataOpretMongo), (req, res)=>{

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8")



// connect to mongoDB
// prøver at sætte mongoDB op
const dbURI = "mongodb+srv://"+process.env.TESTUSERNAME+":"+process.env.TESTPASSWORD+"@cluster0.ktewt.mongodb.net/GamePortal?retryWrites=true&w=majority"

// this is acturly a async task. it goes out and takes some time to do and therefore it returns something like a promise.
// so we can attatch a then method to it, "this action is handled afther the connection to the database have been made."
// we dont want the app to start listening for requests on port 3000 before the connection to the database have been made, and if placed in the then method will connect first then listen.
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));




// mongoose and mongo sandbox routes. " test routes" // skal laves om til post med req. body parametre.
app.get("/game/create", (req, res) => {
const game = new Game({
    name: "Warcraft2",
    genre: "strategy",
    minAge: "age from 5 to 99",
    multiplayer: true,
    playerVsPlayer: true,
    rolePlayingGame: false,
    shooter: false,
    massiveMultiplayerOnlineRoleplayingGame: false
});

// dette er også async, og det tager en lille smule tid at udføre, derfor retunere det et "promise"
// derfor er der muligt at tilføje en .then() method
game.save()
// når data er gemt så sendes result i response body
.then((result) => {
    res.send(result);
})// hvis game modellen ikke bliver oprettet så sendes console logger vi error
.catch((error) => {
    console.log(error);
});

})


// kald til oprettelse af user // skal laves om til post med req. body parametre.
app.get("/user/create", (req, res) => {
const user = new User({
    name: "susan",
    accountName: "susan-nator",
    contactInfo: " discord#4453 - steam#idFiktive",
    age: "21",
    email: "email@gmail",
    gender: "woman",
    userType: "Member",
    onlineState: false,
    mostPlayedGame: "League of legends",
    recentlyPlayedWith: "søren",
    friends: "Friends are: søren - bendte",
});
user.save()
.then((result) => {
    res.send(result);
    console.log("user was succesfully created in the database.")
})
.catch((error) => {
    console.log(error);
})

})

// skal laves om til post med req body parametre som oprettelses værdier. evt check fra andet som værdier.
app.get("/channel/create" , (req, res) =>{
    const channel = new Channel({
        name: "chatChannel",
        minAge: "16",
        text: "text fra chat channel",
        playersInChannel: "mængde af personer i chatten: 1",
        genre: "shooter",
        game: "counter strike 1.6"
    });
    channel.save()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})


app.get("/login", (req, res) => {
    res.sendFile( __dirname + "/public/login/login.html");
})



// kald på alle games.
app.get("/games", (req, res) => {
    // denne async find() metode på Game model finder: alle documenterne indeni game modeller i databasen 
    Game.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
    })

// landingpage test endpoint, som pt sender alle game models
app.get("/users", (req, res) =>{
    User.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})

// landingpage test endpoint, som pt sender alle channel models
app.get("/channels", (req, res) =>{
    Channel.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})


       
    