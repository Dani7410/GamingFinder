const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
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
    
    const Game = mongoose.model("Game", gameSchema);
    module.exports = Game;