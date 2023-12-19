import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    id:{
        type : "string",
        required: true
    },
    name :{
        type : "string"
        // required: true
    },
    email :{
        type : "string",
        required: true
    },
    password :{
        type : "string",
        required: true
    },
})

export const userModel= mongoose.model('users', userSchema)


const urlSchema = mongoose.Schema({
    id:{
        type : "string",
        required: true,
    },
    shortID :{
        type : "string",
        required: true
    },
    redirectURL : {
        type : "string",
        required: true
    },
    visitedHistory:[
        {
            timeStamp:{
                type:Number
            },
            totalClicks:Number
        }
    ],
} ,{timeStamp:true})


export const urlmodel=mongoose.model('urls',urlSchema);