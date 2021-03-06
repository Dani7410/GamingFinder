const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    
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
        maxlength: 500,
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
        unique: true,
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
        
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
}, {timestamps: true});


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() // fortæller appen at user nu er et object, hvor vi kan tilgå værdier

    delete userObject.accountPassword // Fjerner accoutpassword fra at blive set i vores requests
    delete userObject.tokens // fjerner tokens fra at blive set i vores request

    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'JWTTokenGenerated')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token 

}

//Email and password validation for login 
userSchema.statics.findByCredentials = async (email, accountPassword) =>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(accountPassword, user.accountPassword)

    if(!isMatch){
        throw new Error('The login didnt work')
    }

    return user
} 

//hash plain text password before saving    
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('accountPassword')) {
        user.accountPassword = await bcrypt.hash(user.accountPassword, 8)
    }

    next()

    
})

const User = mongoose.model("User", userSchema);
module.exports = User;