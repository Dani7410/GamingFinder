const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");


// bodyparser andvendes på app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



// måde at bestemme hvilken router der skal håndtere hvilke kald.
// app.use("/data" , dataOpretMongo), (req, res)=>{

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8")

app.get("/", (req, res) => {
res.send(header + footer)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, error => {
    if(error){
        console.log(error);
    }
    console.log("server is running on port:", Number(PORT));
});