const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");






//Used to administer .env files in our applications - Used as a part of db connection
dotenv.config()

//Connect with the mongoDB Cluster
const dbURI = "mongodb+srv://"+process.env.TESTUSERNAME+":"+process.env.TESTPASSWORD+"@cluster0.ktewt.mongodb.net/GamePortal?retryWrites=true&w=majority"

// this is acturly a async task. it goes out and takes some time to do and therefore it returns something like a promise.
// so we can attatch a then method to it, "this action is handled after the connection to the database have been made."
// we dont want the app to start listening for requests on port 3000 before the connection to the database have been made, and if placed in the then method will connect first then listen.
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then((result) => app.listen(3000))
// .catch((err) => console.log(err));


//Import with require to get our route
const dbUserRoute = require("./routes/DBuserRoute");
const dbGameRoute = require("./routes/DBgameRoute");
const dbChannelRoute = require("./routes/DBchannelRoute");


// app.use((req, res, next) =>{
//     if(req.method === 'GET'){
//         res.send('GET request disabled')
//     }else{
//         next()
//     }


    //middleware: Stops the request for until the middleware has been fulfilled 
    // console.log(req.method, req.path);
    // next()
// })

// app.use((req,res,next) => {
//     res.status(503).send('site is down check back soon')
//     next()
// })



//App use
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(dbUserRoute.router);
app.use(dbGameRoute.router);
app.use(dbChannelRoute.router);






// how we use SSR to show the HTML pages
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const landingpage = fs.readFileSync(__dirname + "/public/landingPage/landingPage.html", "utf-8");
const userCreate = fs.readFileSync(__dirname + "/public/userCreate/userCreate.html", "utf-8");
// const login = fs.readFileSync(__dirname + "/public/login/login.html", "utf-8");

app.get("/", (req, res) => {
    res.send(header + landingpage + footer)
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login/login.html")
})






app.get("/user/create", (req, res) => {
    res.send(header + userCreate + footer)
})

//Example of how hashing works

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }



// daniel -> fjjkndfksd -> daniel **unhashed
// daniel -> sldkfklsfdklmfs ** hashed


//example of how auth token works
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123'}, 'somethingworks', {expiresIn: '7d'})
//     console.log(token);

//     const data = jwt.verify(token, 'somethingworks')
//     console.log(data);
// }

// myFunction()

//middelware

//without middleware new request -> run router handler

//with middles new request -> do something -> run router handler






const PORT = process.env.PORT || 8080;
app.listen(PORT, error => {
    if(error){
        console.log(error);
    }
    console.log("server is running on port:", Number(PORT));
});