// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// trying to establish connection through a different folder

//     const dbURI = "mongodb+srv://"+process.env.TESTUSERNAME+":"+process.env.TESTPASSWORD+"@cluster0.ktewt.mongodb.net/GamePortal?retryWrites=true&w=majority"
//     const connection = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    


// module.exports = connection

// //Used to administer .env files in our applications - Used as a part of db connection


// //Connect with the mongoDB Cluster


// // this is acturly a async task. it goes out and takes some time to do and therefore it returns something like a promise.
// // so we can attatch a then method to it, "this action is handled after the connection to the database have been made."
// // we dont want the app to start listening for requests on port 3000 before the connection to the database have been made, and if placed in the then method will connect first then listen.

// // .then((result) => app.listen(3000))
// // .catch((err) => console.log(err));