import express from 'express';


const router=express.Router();


router.get('/',(req ,res)=>{
    res.send("Owner Route Working");
});



export default router;