const router= require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User= require("../models/user.model");
const auth= require("../middleware/auth");

router.post("/signup", async(req,res)=>{
    try 
    {let {username,email,password,passwordcheck,firstname,lastname} = req.body;

    if (!email||!username||!password||!passwordcheck||!firstname||!lastname)
    return res.status(400).json({msg:'One or more fields are missing'});
    if(password.length < 8)
        return res
        .status(400)
        .json({msg:"the password must have atleast 8 letter long"});
    if(password !==passwordcheck)
        return res
            .status(400)
            .json({msg:"your password and passwordcheck dont match"});
    const  existingEmail = await User.findOne({email:email});
    const  existingUsername = await User.findOne({username:username});
    if (existingEmail)
    return res
        .status(400)
        .json({msg:"email already in use"});
     if (existingUsername)
     return res
            .status(400)
            .json({msg:"Username has been taken"});
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);
    const  newUser =new User({
        email,
        password:passwordHash,
        username,
        firstname,
        lastname
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }

}); 
router.post("/login", async(req,res)=>{
    try{
        const {email,password}= req.body;
        if(!email||!password)
        return res.status(400).json({msg:"please fill in all of the fields"});
        const user= await User.findOne({email:email});
        if(!user)
        return res.status(400).json({msg:"no account was found"});

        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch)
        return res.status(400).json({msg:"wrong password"});
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                firstname:user.firstname,
                lastname:user.lastname
            }
        });

    }catch(err){
        res.status(500).json({error: err.message});
    }
});
router.post("/IsTokenValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      username: user.username,
      id: user._id,
    });
  });

module.exports=router;