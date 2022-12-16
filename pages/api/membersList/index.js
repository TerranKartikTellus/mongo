

import clientPromise from "/lib/mongodb";

export default async function handler(req, res){
  try {
       const client = await clientPromise;
       const db = client.db("contact");

       const out = await db
           .collection("members")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();
      console.log('out: ',out);
      if (out.length==0){
        return res.status(500).json({message: "No members found"});
      }

      if(out.length>0){
          return res.status(201).json({message: "Members List Found", members: out});
        }
      // res.status(500).json({message: "Members list not fount"});
        
      

   } catch (e) {
       console.error(e);
      res.status(500).json({message: "Error occured Occured while getting Members List."});

   }
};
