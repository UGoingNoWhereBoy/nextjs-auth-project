import mongoose from 'mongoose'
import React from 'react'
import connectdb from '../../db/mongodb'
import posts from './model/postschema'


export default async function handler(req,res){
    
    connectdb().catch(err => console.log(err))
    if (req.method === 'DELETE'){
        const getposts = await posts.deleteOne({author: JSON.parse(req.body)})
        if(!getposts){
            res.status(404).json({error: "Method not allowed"})
        }
        return res.json({getposts})
    
    }else{
        return res.json({error: "Method not allowed"})
    }
  
}