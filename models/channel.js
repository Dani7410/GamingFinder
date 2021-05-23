const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    // by "opening" up the json object we can modify the properties insted of just {name: susan}
    name: {
        type: String,
        required: true  // required so wont be able to create/post without this value.
    },
    minAge: {
        type: String,
        
    },
    // denne type skal muligvis være andet end string hvis vi skal gemme hele chattens beskeder ? text
    text: {
        type: String

    },
    playersInChannel: {
        type: String

    },
    genre: {
        type: String,
        
    },
    game: {
        type: String,
        
    },
}, {timestamps: true});
    
    const Channel = mongoose.model("Channel", channelSchema);
    module.exports = Channel;