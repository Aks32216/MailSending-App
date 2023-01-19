const path=require('path');
const express=require('express');
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const port=3000;
const app=express();
const dotenv=require('dotenv');
dotenv.config();

app.set('view engine','html');
app.engine('html',ejs.renderFile);
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/success',(req,res)=>{
    res.render('success');
    // res.redirect('/');
})

app.post('/send_mail',(req,res)=>{
    let to=req.body.to;
    let subject=req.body.subject;
    let message=req.body.message;

    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER_NAME,
            pass:process.env.USER_PASSWORD
        }
    });

    let mailOptions={
        to:to,
        subject:subject,
        text:message
    };

    transporter.sendMail(mailOptions,(err,success)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Email send successfully");
        }
        res.redirect('/success');
    });

})

app.post('/success',(req,res)=>{
    res.redirect('/');
})

app.listen(port,()=>{
    console.log('listening on port '+port);
})