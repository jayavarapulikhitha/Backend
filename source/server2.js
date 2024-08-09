import express from 'express';
import { connectToDB,db } from "./db.js";
const app = express();

app.use(express.json())


app.get('/' , (req,res )=>{
    res.json("server is running successfully");
   })
   app.post('/insert', async(req, res) => {
    await db.collection("login").insertOne({Email:"likhitha@gmail.com",Password:"1234"})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
 
const handleLogin=async(req,res)=>{
    console.log(req)
    try{



    const user=await db.collection("login").findOne({Email:req.body.Email})
    if(user.Password===req.body.Password){
        res.json("Login success");
    }
    else
    {
        res.json("Failed to login!");
    }
}catch(e){
    console.log(e)
}
}
app.post('/login',async(req,res)=>{
    console.log(req.body)
    try{



    const user=await db.collection("login").findOne({Email:req.body?.Email})
    if(user.Password===req.body?.Password){
        res.json("Login success");
    }
    else
    {
        res.json("Failed to login!");
    }
}catch(e){
    console.log(e)
}
})


connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})