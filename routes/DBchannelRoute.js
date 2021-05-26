const router = require("express").Router();
const Channel = require("../models/channel");

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