

export const handleNewGenerateId= async(req, res) =>{
    const payload =req.body.url;
 const nanoID=nanoid(8);
   
 if(!payload){
     res.status(400).send({msg: "URL is not valid"})
 } 
    await URL.create({ shortID: nanoID, redeirectURL:payload, visitedHistory :[]});
    res.send({id:nanoID})
  
}

