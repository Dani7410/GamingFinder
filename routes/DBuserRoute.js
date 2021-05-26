const router = require("express").Router();
const User = require("../models/user");



// connect to mongoDB
// prøver at sætte mongoDB op


router.post("/user/create", (req, res) => {
    const user = new User(req.body);
    
    user.save()
    .then((result) => {
        res.send(result);
        console.log(user + " was created")
    })
    .catch((error) => {
        console.log('Error message',error);
    })
})

// landingpage test endpoint, som pt sender alle game models
router.get("/users", (req, res) =>{
    User.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})

router.delete("/user/:id", async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
        console.log("User was deleted");
    }catch(error){
        res.status(500).send()

    }
})


// name: "daniel",
// accountName: "susan-nator",
// accountPassword:'123456',
// contactInfo: " discord#4453 - steam#idFiktive",
// age: 21,
// email: "test@gmail",
// gender: "woman",
// userType: "Member",
// onlineState: false,
// mostPlayedGame: "League of legends",
// recentlyPlayedWith: "søren",
// friends: "Friends are: søren - bendte",


module.exports = {router};
