const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator")

const userSchema = new Schema({
    // by "opening" up the json object we can modify the properties insted of just {name: susan}
    name: {
        type: String,
        required: true,  // required so wont be able to create/post without this value.
    },
    accountName: {
        type: String,
        trim: true
        
    },
    accountPassword:{
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 25,
        validate(value){
            if(validator.equals('password',value)){
                throw new Error('password cant be ' + value)
            }
        }
    },
    contactInfo: {
        type: String,
        
    },
    age: {
        type: Number,
        required: true,
        min: [18,'Age must be at least 18'],
        max: 100,
        validate(value){
            if(value < 0 ){
                throw new Error('Age must be a positive number')
            }
        }
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }  
    },
    gender: {
        type: String,
        
    }
    // userType: {
    //     type: String,
        
    // },
    // // er de offline eller online ?
    // onlineState: {
    //     type: Boolean,
        
    // },
    // // evt denne hvor man kan se hvilke spil brugeren spiller mest.
    // mostPlayedGame: {
    //     type: String,
        
    // },
    // recentlyPlayedWith: {
    //     type: String,
        
    // },
    // friends: {
    //     type: String,
        
    // }
}, {timestamps: true});
    
    const User = mongoose.model("User", userSchema);
    module.exports = User;