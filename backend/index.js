const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors())

const mongoUrl=process.env.MONGOURL
const port=process.env.PORT
const secretKey=process.env.SECRETKEY

mongoose.connect(mongoUrl).then(()=>{
    console.log("Connected to database!")
})
.catch((err)=>{
    console.log("error occured while connecting to database!")
})

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }  ,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("user",UserSchema)

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    } ,
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
})

const Task=mongoose.model("task",TaskSchema)

const AuthenticateToken = async (req, res, next) => {

    try {

        const authHeader = req.headers["authorization"]

        if (!authHeader) {

            return res.status(401).send({
                status: false,
                message: "Authorization header missing!"
            })
        }

        const jwtToken = authHeader.split(" ")[1]

        if (!jwtToken) {

            return res.status(401).send({
                status: false,
                message: "Invalid access!"
            })
        }

        jwt.verify(jwtToken, secretKey, (err, payload) => {

            if (err) {

                return res.status(401).send({
                    status: false,
                    message: "Invalid jwt Token"
                })
            }

            req.user = payload

            next()
        })

    } catch (err) {

        return res.status(500).send({
            status: false,
            message: "Server error occured!"
        })
    }
}

app.post("/signup",async(req,res)=>{
    try{
        const query=await User.findOne({email:req.body.email})
        if(query!=null){
          return  res.status(400).send({status:false,message:"User already exists!"})
        }
        else{
            let {name,email,password}=req.body
            password=await bcrypt.hash(password,12)
            const user=new User({name,email,password})
            user.save()
          return  res.status(201).send({status:true,message:"User Registration Successful!"})
        }
    }
    catch(err){
      return  res.status(500).send({status:false,message:"Error occured while processing!"})
    }
})

app.post("/login",async(req,res)=>{
    try{
        const query=await User.findOne({email:req.body.email})
        if(query===null){
           return res.status(400).send({status:false,message:"No Such User!!"})
        }
        else{
            const check=await bcrypt.compare(req.body.password,query.password)
            if(!check){
              return  res.status(400).send({status:false,message:"Invalid password!"})
            }
            else{
                const payload={email:req.body.email}
                const token=jwt.sign(payload,secretKey)
              return  res.status(201).send({status:true,jwtToken:token,username:query.name})
            }
        }
    }
    catch(err){
       return res.status(500).send({status:false,message:"Server error occured!"})
    }
})

app.get("/tasks",AuthenticateToken,async(req,res)=>{
    try{
        const tasks=await Task.find()
        res.status(200).send({status:true,tasks})
    }
    catch(err){
        res.status(500).send({status:false,message:"Server error occured!"})
    }
})

app.post("/addtask",AuthenticateToken, async(req,res)=>{
    try{
     const task=new Task(req.body)
     task.save()
     res.status(200).send({status:true,message:"Task Added Successfully!"})
    }
    catch(err){
        res.status(500).send({status:false,message:"Server error occured!!"})
    }
})

app.put("/update/:id",AuthenticateToken,async(req,res)=>{
    try{
        await Task.updateOne({_id:req.params.id},{$set:{name:req.body.name,description:req.body.description,status:req.body.status}})
        res.status(200).send({status:true,message:"Task Updated Successfully!"})
    }
    catch(err){
        res.status(500).send({status:false,message:"Server error occured!"})
    }
})

app.delete("/delete/:id",AuthenticateToken,async(req,res)=>{
    try{
        await Task.deleteOne({_id:req.params.id})
        res.status(200).send({status:true,message:"Task delete Successfully!"})
    }
    catch(err){
        res.status(500).send({status:false,message:"Server error occured!"})
    }
})

app.listen(port,()=>{
    console.log("server started running!")
})