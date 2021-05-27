const router = require("express").Router({mergeParams: true});
const User = require("../models/user");




// API  kald til oprettelse af user 
 router.post("/user/create", async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)

    } catch(error){
        res.status(400).send(error)
    }
    // user.save()
    // .then(() => {
    //     res.send(user);
    //     console.log("user was succesfully created in the database.")
    // })
    // .catch((error) => {
    //     res.status(400).send(e)
    // })

    // redirect til login.
})

// post "login" metode der tager req body parametre og sammenligner med brugernavn samt password


router.get('/user/one/:id', (req, res) =>{
    // console.log(res.params)
   
    const _id = req.params.id

    User.findById(_id).then((result) =>{
        
        if(!result) {
            console.log('the user was not found');
            return res.status(404).send('the user was not found')
            
        }

        res.send(result)
        console.log('the user was found');
    }).catch((error) =>{
        res.status(500).send()
    })    
})

// user find finder alle users.
router.get("/users/all", (req, res) =>{
    User.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
})



router.patch('/users/update/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name','accountName','accountPassword', 'contactInfo', 'age', 'email', 'gender']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates!' })
    }

    try{

        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true} )

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch(error){

        res.status(400).send()
    }
})



router.delete("/user/delete/:id", async (req,res) => {
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


router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.accountPassword)

        res.send(user)

    }catch(error){
        res.status(400).send()

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
