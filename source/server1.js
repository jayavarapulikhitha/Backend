import cors from 'cors';
import express from 'express';
import { connectToDB,db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/' , (req,res )=>{
 res.json("server is running successfully");
})
app.post('/insert', async(req, res) => {
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insertmany', async(req, res) => {
    await db.collection("ast").insertMany(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})


app.post('/signin', async(req, res) => {
    await db.collection("login").findOne({Email:req.body.Email})
    .then((result)=>{
        console.log(result)
        if(result?.Password===req.body.Password)
        {
        res.json({message:"login success",values:result})
        }
        else{
            res.json({error:"user not found"})
        }
    
    })
    .catch((e)=>console.log(e))
})


app.post('/signup', async(req, res) => {
    
    await db.collection("login").insertOne({Name:req.body.Name,Email: req.body.Email,Password : req.body.Password})
    .then((result)=>{
        res.json(result)
        console.log(result);
    })
    .catch((e)=>console.log(e))
})
app.post('/signup', async(req, res) => {
    await db.collection("login").find({Email:req.body.Email})
    .then((result)=>{
        console.log(result)
        if(result?.Email===req.body.Email)
        {
        res.json({error:"user already have an account",values:result})
        }
        else{
            res.json({message:"login successfull!"})
        }
    
    })
    .catch((e)=>console.log(e))
})

app.post('/forgetpassword', async(req, res) => {
    await db.collection("login").findOne({Email:req.body.email})
    .then((result)=>{
        
        res.json({message:"change password",values:result})
        
    })
    .catch((e)=>console.log(e))
})
app.post('/forgetpassword', async(req, res) => {
    await db.collection("login").updateOne({Password:req.body.password})
    .then((result)=>{
        
        res.json({message:"password changed",values:result})
        
    })
    .catch((e)=>console.log(e))
})


app.post('/students', async(req, res) => {
    
    await db.collection("login").find().toArray()
     .then((result)=>{
         res.send(result)
      }).catch((e)=>console.log(e))})


connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})