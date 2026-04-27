import mongoose from 'mongoose';


const userModel = new mongoose.Schema({
    username:{type:String ,required:true},
    name:{type:String ,required:true},
    email:{type:String , required:true},
    password:{type:String ,required:true},
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

});


const userSchema=mongoose.model("User",userModel);


export default userSchema;