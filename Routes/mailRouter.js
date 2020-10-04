const sgMail= require("@sendgrid/mail");
const router= require("express").Router();
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
router.post("/sendcom",  (req,res)=>{

const {username,email} = req.body;
const signupemail={
    to:email,
    from:"testingsiteaccount@protonmail.com",
    subject:"Thank you for signing up",
    text:" hello "+username,
    html:"<strong>hello "+username+"</strong>"

    }
    sgMail.send(signupemail)
    .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
   
    
});



module.exports=router;