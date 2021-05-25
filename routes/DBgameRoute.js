const router = require("express").Router();
const Game = require("../models/game");




// mongoose and mongo sandbox routes. " test routes" // skal laves om til post med req. body parametre.
router.get("/game/create", (req, res) => {
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

// kald på alle games.
router.get("/games", (req, res) => {
    // denne async find() metode på Game model finder: alle documenterne indeni game modeller i databasen 
    Game.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})

module.exports = {router}