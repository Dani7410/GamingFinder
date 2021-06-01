const router = require("express").Router({mergeParams: true});
const User = require("../models/user");




// API  kald til oprettelse af user 
 router.post("/user/create", async (req, res) => {
    const user = new User(req.body)

    try{

        
        await user.save()
        const token = await user.generateAuthToken()
        
        // res.status(201).send(user)
        res.status(201).send({user, token})
        //res.redirect('/')
        

    } catch(error){
        res.status(400).send(error)
    } 
})


// post "login" metode der tager req body parametre og sammenligner med brugernavn samt password
router.get('/user/one/:id', async (req, res) =>{
    // console.log(res.params)
   
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(error){
        res.status(500).send()
    }
})


// user find finder alle users.
router.get("/users/all", async (req, res) =>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(error){
        res.status(500).send()
    }
})


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
    }
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

    }
})

// post "login" metode der tager req body parametre og sammenligner med brugernavn samt passwo
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.accountPassword)
        const token = await user.generateAuthToken()
        res.send({user, token})

    }catch(error){
        res.status(400).send()

    }
})



module.exports = {router};
