import Express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../db/model.js";
import { v4 } from "uuid";

export const registerRouter = Express.Router();

registerRouter.post('/', async (req, res) => {
    let payload=req.body;
    try{
      const userData=await userModel.findOne({email:payload.email});
      if(userData){
        res.status(409).send({msg:"User already registered"})
      } else{
        bcrypt.hash(payload.password, 10, async(err, data) =>{
            if(data){
                const user=await userModel.create({...payload, password:data, id:v4()});
                res.status(200).send(user.toObject());
            }
        })
      }
    } catch(err){
        console.log(err);
    }
})