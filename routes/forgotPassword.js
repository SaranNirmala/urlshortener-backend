import Express from "express";
import { userModel } from "../db/model.js";
import { transporter , mailOptions } from "./mail.js";
import jwt from 'jsonwebtoken'

export const forgotPasswordRouter=Express.Router();
export let userMail=[];

forgotPasswordRouter.post('/', async (req, res) => {
    const payload=req.body;
    userMail=[];
    userMail.push(payload.email);
    try{
        const user = await userModel.findOne({email: payload.email});
        if(user){
            const verificationToken= jwt.sign({email:payload.email}, process.env.JWT_SECRET, {expiresIn:'5minutes'})
            const verificationLink=`${process.env.FE_URL}/resetPassword?verify=${verificationToken}`
            const transferData ={...mailOptions, to:payload.email, text:`Hi, Please click the below link to confirm your account ${verificationLink}`}
            await transporter.sendMail(transferData)
            res.status(200).send({msg:"Your account has been Verified Successfully"})
        } else{
            res.status(401).send({msg:" Email Invalid"})
        }
    } catch(e){
        console.error(e);
    }
})