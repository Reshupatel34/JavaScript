import mongoose from 'mongoose';
import debug from 'debug';
import config from 'config'

const dbgr = debug("development:mongoose");

 const connectDb = async(req ,res)=>{
    try{
        await mongoose.connect(`${config.get("MONGODB_URI")}/Coach`);
       dbgr("MongoDb connected!");
    }catch(err){
       dbgr("Error connecting the database",err);
    }
}
export default connectDb;
