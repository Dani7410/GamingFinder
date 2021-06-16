const router = require("express").Router();
const Game = require("../models/game");



// kald på alle games.
router.get("/api/games", async (req, res) => {
    // denne async find() metode på Game model finder: alle documenterne indeni game modeller i databasen 
   await Game.find()
        .then((result) => {
          res.send({result});
        })
        .catch((error) => {
          console.log(error);
        }); 
});


// Get kald med id parameter
router.get('/game/:id', async (req, res) =>{
    const _id = req.params.id
    const result = await Game.findById(_id)
   
    try{
        if(!result) 
        {
            console.log('the game was not found');
            return res.status(404).send('the game was not found')
        }
            res.send(result)
            console.log('the game was found');

    } catch(error){
        res.status(500).sendFile(path.resolve(__dirname,'..', 'public/views','errorPage.html'))
    };    
})


// Api kald til oprettelse af game
router.post("/game/create", async (req, res) => {
    const game = new Game(req.body)

    try{
        await game.save()
        res.status(201).send(game)
        
    }catch(error){
        res.status(400).send(error)
    }; 
})

// denne metode mangler rettelser da game har fået flere attrubutter.
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