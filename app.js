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



app.get("/user/create", (req, res) => {
    res.send(header + userCreate + footer)
})






const PORT = process.env.PORT || 8080;
app.listen(PORT, error => {
    if(error){
        console.log(error);
    }
    console.log("server is running on port:", Number(PORT));
});