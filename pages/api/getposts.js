import mongoose from 'mongoose'
import React from 'react'
import connectdb from '../../db/mongodb'
import posts from './model/postschema'


export default async function handler(req,res){
    
    connectdb().catch(err => console.log(err))
    const getposts = await posts.find()
    
    return res.json({getposts})

}