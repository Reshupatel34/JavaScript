import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({
       image :{type:String ,required:true},
       name:{type:String ,required:true},
       price :{type:Number ,required:true},
       discount:{type:Number ,required:true ,default : 0},
       bgcolor:{type:String ,required:true},
       panelcolor:{type:String ,required:true},
       textcolor:{type:String ,required:true},

});


const productModel = mongoose.model("Product",productSchema);

export default productModel;