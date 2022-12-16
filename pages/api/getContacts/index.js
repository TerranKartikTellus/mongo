import clientPromise from "/lib/mongodb";

export default async function handler(req, res){
   try {
       const client = await clientPromise;
       const db = client.db("contact");

       const contact = await db
           .collection("contact")
           .find({})
           .sort({ metacritic: -1 })
           .limit(50)
           .toArray();
console.log(contact);
       res.json(contact);

   } catch (e) {
       console.error(e);
   }
};