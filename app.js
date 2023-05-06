

const express = require('express');
const app = express();
let port = 3000;
const path = require('path');        
const customerCollection = require('./model/model.js');
const { log } = require('console');
const currentCustomer = [];

const template_path = path.join(__dirname, '../template/views');   //finding path

app.set('view engine','hbs');
app.set('views', template_path );

require('./db/db');

app.use(express.urlencoded({extended : false}));
app.use(express.json())

app.get('/', (req,res) =>{
    res.render('index');      // pasing index
});

//route for product selection page
app.get('/productSelection',(req,res)=>{
    res.render('productSelection',{cutomer:currentCustomer});
})


app.post('/registerCustomer', async (req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        // console.log({password,cpassword});
    
        if(password === cpassword){
            let customerdata = new customerCollection({
                Mname : req.body.Mname,
                name : req.body.name,
                address : req.body.address,
                state : req.body.state,
                panCard : req.body.panCard,
                adharCard : req.body.adharCard,
                dob : req.body.dob,
                email : req.body.email,
                countrycode : req.body.countrycode,
                phone : req.body.phone,
                password : req.body.password,
                cpassword : req.body.cpassword
            });
    
            const postData = await customerdata.save();
            currentCustomer=postData;
            res.send(postData);
            console.log(postData);
            res.redirect('/productSelection')
        }
        else{
            res.send("password are not matching...")
        }

    } catch(error){
        res.send(error);
    }
});

// app.get('/login',async(req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;


//     const data = await customerCollection.find({email:email,password:password});
//     console.log(data);
//     if(data === []) {
//         res.status(201).json("Pleas Enter Valid Details")
//     }
//     else if(data)
//     {
//         res.status(200).json(data)
//     } 
// })

app.get('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const data = await customerCollection.find({ email: email, password: password });
    console.log(data);
    if (Array.isArray(data) && data.length === 0) {
      res.status(400).json("Please enter valid details");
    } else {
      res.status(200).json(data);
      currentCustomer=data;
    }
  });
  

app.listen(port, () =>{
    console.log(`listeningto the port ${port}`);
})