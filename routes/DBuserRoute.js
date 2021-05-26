const router = require("express").Router();
const User = require("../models/user");




// // kald til oprettelse af user // skal laves om til post med req. body parametre.
 router.post("/createUser", (req, res) => {
    const user = new User(req.body)
    user.save()
    .then((result) => {
        res.send(result);
        console.log("user was succesfully created in the database.")
    })
    .catch((error) => {
        console.log(error);
    })

    // evt redirect til login.
})


router.get('/users/:id', (res,req) =>{
    const _id = req.params.id

    User.findById(_id).then((user) =>{
        if(!user) {
            return res.status(404).send()
        };

        res.send(user)

    }).catch((e) =>{
        res.status(500).send()
    })

    
    
})


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
