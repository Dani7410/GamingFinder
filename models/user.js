const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // by "opening" up the json object we can modify the properties insted of just {name: susan}
    name: {
        type: String,
        required: true  // required so wont be able to create/post without this value.
    },
    accountName: {
        type: String,
        
    },
    contactInfo: {
        type: String,
        
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
    userType: {
        type: String,
        
    },
    // er de offline eller online ?
    onlineState: {
        type: Boolean,
        
    },
    // evt denne hvor man kan se hvilke spil brugeren spiller mest.
    mostPlayedGame: {
        type: String,
        
    },
    recentlyPlayedWith: {
        type: String,
        
    },
    friends: {
        type: String,
        
    }
}, {timestamps: true});
    
    const User = mongoose.model("User", userSchema);
    module.exports = User;