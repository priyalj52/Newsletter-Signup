//jshint esversion:6
const express=require('express');

const app=express();
const bodyParser=require('body-parser');
const request = require('request');
const secrets = require("./secrets");
const https=require('https');
// const { errors } = require('console');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //static folder where we can have local files


app.get("/",function(req,res){
  // console.log("req recieved");
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fname=req.body.FirstName;
  const lname=req.body.LastName;
  const email=req.body.email;
  console.log(fname+lname+" "+email);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]

  };
  var jsonData=JSON.stringify(data);
  const url="https://"+secrets['dc']+".api.mailchimp.com/3.0/lists/e48216dc72";
  const options={
    method:"POST",
    auth:"priyal01:"+secrets['api-key']
  };
 
    const request=https.request(url,options,function(response)
    {
     if(response.statusCode === 200)
     res.sendFile(__dirname+"/success.html");
        
         
          else
       res.sendFile(__dirname+"/failure.html");
       console.log("failure");
   
        
         
        
         
     
        
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
});
    request.write(jsonData);
    request.end();
});
app.post("/backToMain",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});

//API Keys(api-key):  

//ListID(list-id): 

//Data Center(dc): usX


//To Use the code just replace the API_KEYS with your API's keys and LIST_ID with your List Id generated on Milchimp (https://mailchimp.com/)

//Also Make sure to Replace with your Data Center available on your API keys. Example: Mine was us8 

