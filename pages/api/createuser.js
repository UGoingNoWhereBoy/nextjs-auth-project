import connectdb from "../../db/mongodb";
import User from './model/schema'
import { hash } from "bcrypt";
export default async function handler(req, res) {

    await connectdb();

    if (req.method === 'POST'){

      const bodyObject = JSON.parse(req.body)

      if(!bodyObject){
        return res.status(404).json({error: "No data"})
      }
      
      const {name, email, password} = bodyObject;
      const checkDup = await User.findOne({email});
      const checkDup2 = await User.findOne({name});

      if(checkDup){
        return res.status(422).json({message:"Email in use."})
      }
      if(checkDup2){
        return res.status(421).json({message:"Username in use."})
      }
      
      User.create({name,email,password: await hash(password, 10)}, function(err,data){
        if(err) return res.status(404).json({err});
        res.status(201).json({status: true, user:data})
      })
      

    }else{
      res.status(500).json({message:"Method not allowed"})
    }
}  