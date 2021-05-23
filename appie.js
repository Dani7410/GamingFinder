const express = require("express");
const mongoose = require("mongoose");
const Game = require("./models/game");
const dotenv = require("dotenv");
dotenv.config()

const app = express();


// connect to mongoDB
// prøver at sætte mongoDB op
const dbURI = "mongodb+srv://"+process.env.TESTUSERNAME+":"+process.env.TESTPASSWORD+"@cluster0.ktewt.mongodb.net/GamePortal?retryWrites=true&w=majority"

// this is acturly a async task. it goes out and takes some time to do and therefore it returns something like a promise.
// so we can attatch a then method to it, "this action is handled afther the connection to the database have been made."
// we dont want the app to start listening for requests on port 3000 before the connection to the database have been made, and if placed in the then method will connect first then listen.
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// mongoose and mongo sandbox routes. " test routes"
app.get("/add-game", (req, res) => {
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

app.get("/all-games", (req, res) => {
    // denne async find() metode på Game model finder: alle documenterne indeni game modeller i databasen 
    Game.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
    })
       
    