const router = require("express").Router();
const User = require("../models/user");
const auth = require('../Middleware/auth');
const path = require('path');
const { update } = require("../models/user");




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


// API get find finder min bruger .
router.get("/users/me", auth, async (req, res) =>{
    res.send(req.user)
});


// path til at update min bruger
router.post('/users/update/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name','accountName', 'contactInfo', 'age', 'email', 'gender','accountPassword']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))
    
    if(!isValidOperation ){
        return res.status(400).send({ error: 'invalid updates!' })
    }
    
    try{
        const user = await User.findById(req.user)

        updates.forEach((update) => req.user[update] = req.body[update])
        
        // her laves check på om post request body variabler indeholder tom string / ingen data. og hvis de gør brug allerede
        // oprettet data fra user.findById metodekald. "hvis ingen data. indsæt data der findes allerede."
        if(req.user.name == ""){
            req.user.name = user.name
        }
        if(req.user.accountName == ""){
            req.user.accountName = user.accountName
        }
        if(req.user.contactInfo == ""){
            req.user.contactInfo = user.contactInfo
        }
        // ved age checker der kun for forkerte værdier og intet sker hvis der rammes en værdi der ikke må bruges. da
        // findById metodekaldet's variabel værdi bliver anvendt. "hvis forkert eller ingen værdi, brug den allerede gemte værdi."
        if(req.body.age <18 || req.body.age >= 100 || req.body.age == "" || req.body.age == null){
            req.user.age = user.age
        }   
        if(req.user.email == ""){
            req.user.email = user.email
        }
        if(req.user.gender == ""){
            req.user.gender = user.gender
        }

        await req.user.save()

        res.redirect("/profile/me")

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
