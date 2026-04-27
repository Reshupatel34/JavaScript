import mongoose from 'mongoose';



const connectDb = async(req,res)=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/miniproject");
        console.log("MongoDb connected!");
    }catch(err){
        console.log("Error Occured during db connection",err);
    }
}
export default connectDb;