import mongoose from "mongoose";
import env from "dotenv"

env.config();

const userName=process.env.USER_NAME || '';
const password=process.env.PASSWORD_DB || '';
const cluster= process.env.CLUSTER || '';
const dbName=process.env.DB_NAME || '';

const localDB='mongodb://localhost:27017/Day40'

const cloudUrl =`mongodb+srv://${userName}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

const connectToDB = async() => {
   try{
    const db = mongoose.connect(cloudUrl)
    if(db){
       console.log("connecting to Database")
    } 
   } catch(e){
    console.error("DB connection error", e);
    process.exit(1);
   }
}

export default connectToDB;