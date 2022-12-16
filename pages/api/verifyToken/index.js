
import jwt from "jsonwebtoken";


export default async function handler(req, res){
  console.log('token verification start');
  try {
    const {token} = req.body
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
       console.log('erre',err);
      }
    });
    
    res.status(500).json({message: "password incorrect"});
        
      

   } catch (e) {
       console.error('light',e);
   }
};

