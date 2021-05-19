const express = require("express");
const app = express();
const path = require('path')

app.use(express.json());
app.use(express.static("public"));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/frontpage.html" );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, error => {
    if(error){
        console.log(error);
    }
    console.log("server is running on port:", Number(PORT));
});