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
        
        res.redirect('/login')
        

    }catch(error){
        res.status(400).sendFile(path.resolve(__dirname,'..', 'public/views','errorPage.html'))
    }; 
})



// user find finder min bruger .
router.get("/users/me", auth, async (req, res) =>{
    res.send(req.user)
});


// path til at update min bruger
router.patch('/users/update/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name','accountName', 'contactInfo', 'age', 'email', 'gender','accountPassword']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates!' })
    }

    try{
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()


        res.send(req.user)

    } catch(error){
        res.status(400).send(error)
    };
})


// delete metode til at delete min bruger
router.delete("/user/delete/me",auth, async (req,res) => {
    try{


        await req.user.remove()

        res.send(req.user)
        console.log("User was deleted");

    }catch(error){
        res.status(500).send()

    };
})

// post "login" metode der tager req body parametre og sammenligner med brugernavn samt password til at logge ind
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.accountPassword)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token, { maxAge: 21600000 })
        
        res.redirect("/")
        
        

    }catch(error){
        res.status(400).sendFile(path.resolve(__dirname,'..', 'public/views','errorPage.html'))

    };
});
// logger en authenticated bruger ud
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token

        })
        await req.user.save()
        
        res.clearCookie("auth_token").redirect("/login")
    }catch(error){
        req.status(500).send()

    }
})
//logger authenticated account ud fra alle devices med
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


//Get all users is deprecated
// router.get("/users/all", auth, async (req, res) =>{
//     try{
//         const users = await User.find({})
//         res.send(users)

//     }catch(error){
//         res.status(500).send()
//     };
// });

// post "login" metode der tager req body parametre og sammenligner med brugernavn samt password
//this route is deprecated but is still usable
// router.get('/user/one/:id', async (req, res) =>{
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)

//     }catch(error){
//         res.status(500).send()
//     };
// });
