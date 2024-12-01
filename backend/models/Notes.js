

const mongoose = require('mongoose');
const {Schema}= mongoose;
const NotesSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,// this says that which user from User.js schema is linked with Notesjs schema 
        // appne ko mention karna padega kis user ke notes hai ye 
        ref: 'user'

    },
    title:{ 
        type: String,
        required: true
     },
    description :{
        type:String,
        required:true
    },
    tages:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  module.exports= mongoose.model('notes',NotesSchema);
