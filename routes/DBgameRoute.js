const router = require("express").Router();
const Game = require("../models/game");
//original 

// mongoose and mongo sandbox routes. " test routes" // skal laves om til post med req. body parametre.
router.get("/game/create", async (req, res) => {
    const game = new Game({
        // name: "Valorant",
        // genre: "Shooter, FPS",
        // minAge: "10",
        // channelLink: "https://www.artbook.net/en/work-in-progress/#iLightbox[gallery4319]/0",
        // image: "https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-285x380.jpg",
        // multiplayer: true,
        // playerVsPlayer: true,
        // rolePlayingGame: false,
        // shooter: true,
        // massiveMultiplayerOnlineRoleplayingGame: false
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
});

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
});

// kald på alle games.
router.get("/api/games", async(req, res) => {
    // denne async find() metode på Game model finder: alle documenterne indeni game modeller i databasen 
    // original
    // Game.find()
    //     .then((result) => {
    //       res.send({result});
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    const game = new Game(req.body)

    try{
        await game.save()
        // const token = await user.generateAuthToken()
        
        // res.status(201).send(user)
        res.status(201).send({game})
        //res.redirect('/')
        

    }catch(error){
        res.status(400).send(error)
    }; 



});

// Get kald med id parameter
router.get('/game/:id', (req, res) =>{

    const _id = req.params.id

    Game.findById(_id)
    .then((result) =>{
        
        if(!result) 
        {
            console.log('the game was not found');
            return res.status(404).send('the game was not found')
        }

        res.send(result)
        console.log('the game was found');

    }).catch((error) =>{

        console.log(error);
        res.status(500).send()
    });    
})

// Api kald til oprettelse af game
router.post("/game/create", (req, res) => {
    const game = new Game(req.body)
    game.save()
    .then((result) => {
        res.send(result);
        console.log("game was succesfully created in the database.")
    })
    .catch((error) => {
        console.log(error)
        res.send(error);
    })
})

// patch/ update route
router.patch("/game/update/:id", async (req, res) =>{
    const updatesData = Object.keys(req.body)
    const allowedUpdates = ["name", "genre", "minAge", "multiplayer", "playerVsPlayer", "rolePlayingGame", "shooter", "massiveMultiPlayerOnlineRoleplayingGame"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: "invalid updates!" })
    }
    try{
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
    
        if(!game){
            return res.status(404).send()
        }

        res.send(game)
    } catch(error){
        res.status(400).send()
    }
})

// delete
router.delete("/game/delete/:id", async (req,res) => {
    try{
        const game = await Game.findByIdAndDelete(req.params.id)

        if(!game){
            return res.status(404).send()
        }
        res.send(game)
        console.log("User was deleted");
    }catch(error){
        res.status(500).send()

    }
})

module.exports = {router}