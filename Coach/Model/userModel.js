import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
      name:{type:String ,minlength:5,trim:true, required:true},
      email:{type:String ,required:true},
      password:{type:String  ,required:true},
      address:{type:String ,required:true},
      role:{type:String,enum:["user","admin"],default:"user"},
      cart:[
          {type:mongoose.Schema.Types.ObjectId,
            ref:"product"

        }
      ],
      orders:[

      ],
      contact:{type:Number ,required:true },
      picture:{type:String ,required:true}
});


const userModel=mongoose.model("User",userSchema);

export default userModel;