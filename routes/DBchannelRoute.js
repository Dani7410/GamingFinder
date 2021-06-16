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

        res.redirect("/channelView")
        console.log("the channel was found");
    }).catch((error) =>{
        console.log(error)
        res.status(400).send()
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