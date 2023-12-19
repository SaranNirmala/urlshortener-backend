import Express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../db/model.js";

export const loginRouter = Express.Router();

loginRouter.post('/', async(req, res) => {
  let payload =req.body;
  try{
    const checkUserMail=await userModel.findOne({email : payload.email});
    if(checkUserMail){
        bcrypt.compare(payload.password, checkUserMail.password, async(err, data) =>{
          if(data){
            res.status(200).send(data);
          } else{
            res.status(401).send({msg:"invalid password"});
          }
        })
    } else{
        res.status(403).send({msg:"User not registered"});
    }
  } catch(err){
    console.error(err);
  }
})
