import mongoose from 'mongoose';

 const connectDb = async(req ,res)=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Coach");
        console.log("MongoDb connected!");
    }catch(err){
       console.log("Error connecting the database",err);
    }
}
export default connectDb;
