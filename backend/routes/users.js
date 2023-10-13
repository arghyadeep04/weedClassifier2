const express = require('express');
const User = require('../models/users');
const Output = require('../models/outputs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUser } = require('../middleware/getUser');

const userRouter = express.Router();
const secret = "secret"; 

userRouter.post('/register',async(req,res)=>{
    let inp=req.body;
    console.log(inp)
    await User.syncIndexes()
    let hash=await bcrypt.hash(inp.Password, 2);
    inp.Password=hash
    let myuser=await User.findOne({Username:inp.Username})
    if(!myuser){
    User.insertMany([inp]).then(async val=>{
        let data={id:val[0]._id}
        let token=await jwt.sign(data,secret)
        res.send({token,username:inp.Username});
        return
    })}else{
        res.status(400).send({error:"Username already exists"})
        return
    }
    
})

userRouter.post('/login',async(req,res)=>{
    const {Username,Password}=req.body;
    console.log(Username,Password);
   let myuser= await User.findOne({Username})
   if(!myuser){
    res.status(400).send({error:"Username does'nt exist"})
    return
   }
   let result=await bcrypt.compare(Password,myuser.Password)
   if(result){
    let token=await jwt.sign({
        id:myuser._id
    },secret)
    res.send({token,username:myuser.Username})
    return
   }else{
    res.status(400).send({error:"Username or password is incorrect"})
    return
   }
})

userRouter.get('/getuser',getUser,(req,res)=>{
    res.send(req.user)
})



userRouter.get('/history', getUser, async (req, res) => {
    try {
      const userId = req.user._id; 
      const userToken = req.header('userToken');
      const decoded = jwt.verify(userToken, secret);
  
      if (decoded.id !== userId.toString()) {
        return res.status(401).json({ error: 'Token is not valid for this user' });
      }
  
      const transactions = await Output.find({ user: userId })
        .sort({ Date: -1 })
        .exec();
  
      console.log('Retrieved transactions:', transactions); 
  
      res.send(transactions);
    } catch (error) {
      console.error('Error:', error); 
      res.status(401).json({ error: 'Invalid token or no transactions found' });
    }
  });
  
  
  
userRouter.post('/addtohistory', getUser, async (req, res) => {
    
      const userToken = req.header('userToken'); 
      console.log('Received token:', userToken); 
  
      const decoded = jwt.verify(userToken, secret);
      console.log('Decoded token:', decoded); 
  
      
      if (decoded.id !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Token is not valid for this user' });
      }
  
      const { inputImageURL, output, date } = req.body;
      const userId = req.user._id; 
  
      const newTransaction = new Output({
        inputImageURL,
        output,
        Date: date || new Date(),
        user: userId, 
      });
  
      
      await newTransaction.save();
  
      res.send({ status: 'ok' });
   
  });
  
  
module.exports = userRouter;
