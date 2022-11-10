import mongoose from "mongoose";


const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    author: {
        type:String,
        required:true,
    }
})

const posts = mongoose.models.Posts || mongoose.model('Posts', postsSchema) 

export default posts;