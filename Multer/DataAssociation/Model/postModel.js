import mongoose from 'mongoose';



const postModel= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:"User"},
    date:{
        type:Date,
        default:Date.now
    },
    content : {type:String},
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
});

const postSchema=mongoose.model('Post',postModel);


export default postSchema;


