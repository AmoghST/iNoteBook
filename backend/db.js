const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/inotebook"
async function connectToMongo() {
    await mongoose.connect(mongoURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));// this code is taken from youtube comment section 
  }
module.exports= connectToMongo;


// async Function: The async keyword is used to declare an asynchronous function. An async function always returns a Promise.

// await Operator: The await operator is used to wait for a Promise to settle (resolve or reject). It can only be used inside an async function.

// mongodb+srv://talekaramogh554:zGl3jSZ1V9EpGise@cluster0.qpze0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// this is the mongodb atlas string for db connection 