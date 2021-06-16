const router = require("express").Router();
const Channel = require("../models/channel");



// get på channel id.
router.get("/channel/:id", async (req, res) =>{
    const _id = req.params.id

    await Channel.findById(_id)
    .then((result) =>{

        if(!result) {
            console.log("the channel was not found");
            return res.sendStatus(404).send("the channel was not found")
        }

        res.send(result)
        console.log("the channel was found");
    }).catch((error) =>{
        console.log(error)
        res.status(400).send()
    })
})



// skal laves om til post med req body parametre som oprettelses værdier. evt check fra andet som værdier.
router.get("/channel/create" , (req, res) =>{
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


// landingpage test endpoint, som pt sender alle channel models
router.get("/channels", (req, res) =>{
    Channel.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})



module.exports = {router}