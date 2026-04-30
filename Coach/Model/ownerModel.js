import mongoose from 'mongoose';


const ownerSchema = new mongoose.Schema({
      name:{type:String ,minlength:5,trim:true, required:true},
      email:{type:String ,required:true},
      password:{type:String  ,required:true},
      products:[

      ],
      picture:{type:String ,required:true},

});


const ownerModel=mongoose.model("Owner",ownerSchema);

export default ownerModel;