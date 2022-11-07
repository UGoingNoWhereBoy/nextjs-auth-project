import mongoose, { connect } from "mongoose";


const connectdb = async() => {
  await mongoose.connect(process.env.MONGODB_URI)
  
}


export default connectdb