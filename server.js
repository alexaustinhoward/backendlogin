 const express = require("express");
 const mongoose=  require("mongoose");
 const cors= require("cors");
 const path = require('path');
 require("dotenv").config();
 const app =express();

 app.use(express.json());
 app.use(cors());
 const PORT = process.env.PORT||8081;
 app.use(express.static(path.join(__dirname, 'client', 'build')));
 app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
 app.listen(PORT,()=> console.log('the server up'));

 mongoose.connect(process.env.MONGODB_CONNECTION_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true },
    (err)=>{
        if(err) throw err;
        console.log("mongodb is connected");
    });
    
 
app.use("/users", require("./Routes/userRouter"));
app.use("/users", require("./Routes/mailRouter"));
