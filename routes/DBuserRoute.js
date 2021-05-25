const router = require("express").Router();
const User = require("../models/user");



// connect to mongoDB
// prøver at sætte mongoDB op


router.get("/user/create", (req, res) => {
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

router.delete("/games/:id", (req,res) =>{
    
})


module.exports = {router};
