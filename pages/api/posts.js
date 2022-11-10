import mongoose from 'mongoose'
import React from 'react'
import connectdb from '../../db/mongodb'
import posts from './model/postschema'

export default async function handler(req,res){

     connectdb().catch(err => res.status(500).json({message: 'there was an error connecting to the database'}))
     
     if(req.method === 'POST'){

        const bodyOb = JSON.parse(req.body)
        const {title, description, author} = bodyOb;
        const checkposts = await posts.findOne({author: author})
        if (checkposts != null){
         
         return res.status(401).json({message: 'Cant publish more then one post.. for now :)'})
      
        }
        const newpost  = await posts.create({title, description, author})
      
        return res.json({message: 'Post created!'})
     }
     if (req.method === 'PUT'){ 
        return res.json({message: 'method is put'})
     }
     if (req.method === 'GET'){
      return res.json({message: 'method is GET'})
     }
     if (req.method === 'DELETE'){
      return res.json({message: 'method is Delete'})
     }
     
}
