import express from "express";
import connectDb from "./config/Db.js";
import userSchema from "./Model/userModel.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import postSchema from "./Model/postModel.js";

const app = express();
connectDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

// to test the multer
app.get('/test',(req ,res)=>{
  res.render("test");
});

app.post('/upload',(req ,res)=>{
   
});

// to create/register the user
app.post("/register", async (req, res) => {
  const { username, name, email, password } = req.body;
  let useralready = await userSchema.findOne({ email: email });
  if (useralready) return res.send("USer Already exist");
  //    hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // if the user doesnot exist then create
  const createdUser = await userSchema.create({
    username,
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ email: email, userid: userSchema._id }, "secret");
  res.cookie("token", token);
//   res.send(createdUser);
res.redirect('login')
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let useralready = await userSchema.findOne({ email: email });
  if (!useralready) return res.send("User doesnot exist");
  const result = await bcrypt.compare(password, useralready.password);
  if (result) {
    const token = jwt.sign({ email: email, userid: userSchema._id }, "secret");
    res.cookie("token", token);
    res.status(200).send("You can login");
  } else {
    return res.status(500).send("Not ");
  }
});

// logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

const isLoggedIn = (req, res, next) => {
  if (!req.cookies.token) {
    return res.send("You need to login");
  } else {
    const data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
  }
  next();
};
// 

// profile useing middleware
app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userSchema.findOne({ email: req.user.email }).populate("posts");
  const {content} = req.body;
  const post = await postSchema.create({
    user:user._id,
    content
  });
  
  user.posts.push(post._id);
  await user.save();
  console.log(user);
  res.render("profile",{data:user});
});


// likes
app.get("/like/:id",isLoggedIn,async(req,res)=>{
   const post =await postSchema.findOne({_id:req.params.id}).populate("user");
   
   if(post.likes.indexOf(req.user.userid)===-1){
     post.likes.push(req.user.userid);

   }else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1);
   }
   await post.save();
   res.redirect('/profile');

});

// const users = ["u1", "u2", "u3"];
// const posts = [
//   {
//     id: "p1",
//     likes: ["u2"]   // already u2 ne like kiya hai
//   }
// ];
// req.user.userid = "u1"
//["u2"]
//post.likes.indexOf("u1") === -1  ✅ (not found)
// // post.likes.push("u1")
// post.likes.push("u1")
// ["u2", "u1"]
//req.user.userid = "u1"
//  ["u2", "u1"]
// post.likes.indexOf("u1") !== -1 ❌ (already present)
// post.likes.splice(post.likes.indexOf("u1"), 1);
// indexOf("u1") = 1
// splice(1,1)
// ["u2"]



// for editing the posts we will render new edit page and after the button gets clicked we will redirect to the profile page

app.get('/edit/:id',isLoggedIn,async(req ,res)=>{
  // find the post and see if it exist or not,well it obv exists that how i clicked the button to update
   const post = await postSchema.findOneAndUpdate({id:req.user.params},{content:req.body.content});

   res.redirect("/profile");
});

// to update
app.post('/update/:id',(req,res)=>{
    
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
