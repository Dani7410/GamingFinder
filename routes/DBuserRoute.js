const router = require("express").Router();
const User = require("../models/user");
const auth = require('../Middleware/auth');
const path = require('path')




// API  kald til oprettelse af user 
 router.post("/user/create", async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        
        
        // res.status(201).send(user)
        //res.status(201).send({user, token})
        res.redirect('/login')
        

    }catch(error){
        res.status(400).send(error)
    }; 
})


// post "login" metode der tager req body parametre og sammenligner med brugernavn samt password
router.get('/user/one/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(error){
        res.status(500).send()
    };
});


// user find finder alle users.
router.get("/users/me", auth, async (req, res) =>{
    res.send(req.user)
});

// router.get("/users/all", auth, async (req, res) =>{
//     try{
//         const users = await User.find({})
//         res.send(users)

//     }catch(error){
//         res.status(500).send()
//     };
// });

// path til at update in bruger
router.patch('/users/update/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name','accountName', 'contactInfo', 'age', 'email', 'gender']
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
        res.status(400).send(error)
    };
})


// delete metode til at delete en bruger
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

    };
})

// post "login" metode der tager req body parametre og sammenligner med brugernavn samt passwo
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.accountPassword)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token, { maxAge: 21600000 })
        //res.send({user, token})
        res.redirect("/")
        
        

    }catch(error){
        res.status(400).send(error)

    };
});

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token

        })
        await req.user.save()
        //res.send()
        res.clearCookie("auth_token").redirect("/login")
    }catch(error){
        req.status(500).send()

    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []

        await req.user.save()

        res.send()

    }catch(error){ 
        res.status(500).send()

    }
})



module.exports = {router};

//Former router method which gets all user without authentication..
//since we dont wanne expose data to all users, we have created a middleware function which authenticates an 
//user before we can access the data. In that case its all done by a token.
//That means that the get all users function is deprecated. And now we can only return one user with the 
// right authentication. That way users have no way of seeing data on other users, beside them selves.
// router.get("/users/all", auth, async (req, res) =>{
//     try{
//         const users = await User.find({})
//         res.send(users)

//     }catch(error){
//         res.status(500).send()
//     };
// });