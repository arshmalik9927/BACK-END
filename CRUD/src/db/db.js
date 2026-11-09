import mongoose from "mongoose";

function conectToDB(){
    mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
  .then(() => console.log('Connected!'));
}

export default conectToDB;
