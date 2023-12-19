import Express from "express";
import { nanoid } from "nanoid";
import { urlmodel } from "../db/model.js";
import {v4} from 'uuid'

export const urlRouter= Express.Router();

urlRouter.post('/', async(req, res) =>{
    const payload =req.body.url;
 const nanoID=nanoid(8);
try{
    if(payload){
        const data=await urlmodel.create({ shortID: nanoID, redirectURL:payload, visitedHistory :[], id:v4()});
        //await urlmodel.findOne({data})
        res.status(200).send(data)
     } else{
        res.status(400).send({msg: "URL is not valid"})
     }
} catch(e){
    console.error(e)
}
  
})


urlRouter.get('/:shortID', async(req, res) => {
    const shortID = req.params.shortID;
    try{
        const idData=await urlmodel.findOneAndUpdate({shortID}, {$push:{
            visitedHistory:{
                timeStamp: Date.now()
            }
        }});
        if(idData){
            res.redirect(idData.redirectURL);
            // console.log(idData);
        } else{
            res.status(404).send({msg : "Not Found"})
        }

    } catch(err){
        console.error(err)
    }
})


urlRouter.get('/:id', async(req, res) =>{
    const id= req.params.id;
  try{
    const result = await urlmodel.findOne({id:id});
    if(result){
        console.log("i am rendering", result.visitedHistory.length)
        res.send({totalClicks: result.visitedHistory.length})
    }
  } catch(e){
    console.error(e)
  }
} )

urlRouter.get('/', async (req, res) =>{
  const payload=req.body;

  try{
   const data=await urlmodel.find({})
   if(data){
    res.status(200).send(data)
   } else{
    res.status(404).send({msg: 'Not Found'});
   }
  } catch(err){
    console.error(err);
  }


})