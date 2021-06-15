const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    // by "opening" up the json object we can modify the properties insted of just {name: susan}
    name: {
        type: String,
        required: true  // required so wont be able to create/post without this value.
    },
    genre: {
        type: String,
        required: false
    },
    minAge: {
        type: String,
        
    },
    channelLink: {
        type: String,

    },
    image: {
        type: String,

    },
    multiplayer: {
        type: Boolean,
        
    },
    playerVsPlayer: {
        type: Boolean,
        
    },
    rolePlayingGame: {
        type: Boolean,
        
    },
    shooter: {
        type: Boolean,
        
    },
    massiveMultiplayerOnlineRoleplayingGame: {
        type: Boolean,
        
    }
}, {timestamps: true});

gameSchema.methods.toJSON = function () {
    const game = this
    const gameObject = game.toObject() // fortæller appen at user nu er et object, hvor vi kan tilgå værdier
    
    return gameObject
}

    
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;