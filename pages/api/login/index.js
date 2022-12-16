

import { ObjectId } from "mongodb";
import clientPromise from "/lib/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res){
  try {
       const client = await clientPromise;
       const db = client.db("contact");
       const {email,password} = req.body;  

       const out = await db
           .collection("users")
           .find({email: email})
           .sort({ metacritic: -1 })
           .limit(1)
           .toArray();
      if (out.length==0){
        return res.status(500).json({message: "No user found"});
      }

      if(out[0].password==password){
          await setLastTimeStamp(out[0]._id)
          const token = jwt.sign({...out[0], isLogin: 1}, process.env.SECRET_KEY ) 
          return res.status(201).json({message: "Login Succcess", token: token});
        }
      res.status(500).json({message: "password incorrect"});
        
      
       console.log('out',out[0].password);

   } catch (e) {
       console.error(e);
   }
};

async function setLastTimeStamp(id){
  const time = new Date().getTime();
  const client = await clientPromise;
       const db = client.db("contact");

       const out = await db
           .collection("users")
           .update(  { _id: ObjectId(id) } , { $set: { lastLogin : time  } } )
          //  .updateOne({lastLogin: time})
          //  .where({ "_id":  })
           
       console.log('time st: ',out);
}