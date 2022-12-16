import { MongoClient } from "mongodb";

import clientPromise from "/lib/mongodb";

export default async function handler(req, res) {
  console.log('sent',JSON.parse(req.body));
    console.log('sent2');

 const client = await clientPromise;
 const db = client.db("contact");
  
    try{
     if(Insert(db,JSON.parse(req.body))){
       console.log('sent3');
      res.status(201).json({ msg: 'Insertion Completed' })
      }
    }catch(e){
      res.status(500).json({ msg: 'Unable to insert' })
    }
}

async function Insert(db,data){
  const  u =  await db.collection("contact").insertOne(data);
  return u.insertedCount ;
}