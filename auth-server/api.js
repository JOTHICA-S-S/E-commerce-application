//included the express server
const express=require("express");

//included file systerm. Defalut package comes with node. It is like cerating our own db.
//Storing all data coming with api
const fs=require("fs");

//we have router method in express server.we can get router instance by calling the router method.
//with this router instance, we can create our own api.
const router=express.Router();

// //including the products.js file having product data
// const productData=require("./products");

//import jsonwebtoken to cerate token
const jwt=require("jsonwebtoken");



//when the user hits on empty path(//localhost:8000/api), then the corresponding message gets printed
router.get("/",(req,res)=>{
    res.send("Hello, from API server");
})

//registration api
//handle the request using router instance and it is post api
//sec parameter is anonymous function having two parameters request and reposne
router.post("/signUp",(req,res)=>{

    //userdata will have format as {{email:'', password:''}}=> json format
    //all the data sen dfrom front end, form is present in body, we will get the datat using req.body
    const userdata=req.body;

    //need to check whther the user is alrady present or not
    

    // so we need to read the file using package file system
    //we have to ouse readfile method in file system
    //pass the json file, format and three parameter should be err or data handling
    fs.readFile("data.json", "utf-8", (err, data)=>{
        let dataArr=[];

        //first we have to handle err
        //if there is any
        // err, we will send the error to front end and stop the execution.
        if(err){
            res.send(err);
            return;
        }

        let isUserPresent=false;
        //checking data is present or not// cheking whther the data.json is empty or not
        if(data)
        {
            //if data is present, then we have to parse the data, because, we pass data as array, but when we get from file system, we will be getting it as string, so we need to parse it as array again.
            dataArr= JSON.parse(data);
            //some method is used to checing if any of the data matched with the gicen data or ot
            isUserPresent=dataArr?.some(dataObj=>dataObj.email===userdata.email);

        }

        if(isUserPresent)
        {
            res.send("user already exists");
            return;
        }

        //is there is not err, and the useer does not alrady exist, then we have to add the entered data into our existing file system.
        dataArr.push(userdata);
        //we have to conert the array into string format
        const content=JSON.stringify(dataArr);
        fs.writeFile("data.json", content, err=>{
            if(err){
                res.send(err);
                return;
            }

            //fist we heve to create payload before creating the token
            //fr creating the payload, we have to cerate subject using anyof the data we have, here we prefer email as they are unique
            let payload={
                subject:userdata.email
            }

            //To create token, use the package instance(jwt) and use sign method, sign method requires two paramaters,
            // One is the payload we have cerated and the other is a unique key; we need to  cerate a private key for our application ans share it
            let token= jwt.sign(payload,"test");

            // Now , instead of sending the userdata saved successfully message, we can send the token, but in object formaat.
            res.send({token});
        })
    });
    
});


//login api
router.post("/signIn",(req,res)=>{
    const userData=req.body;

    fs.readFile("./data.json", "utf-8", (err,data)=>{

        if(err)
        {
            res.send(err);
            return;
        }

        if(!data)
        {
            res.send("user data not found");
            return;
        }

       const dataArr=JSON.parse(data);
       const isUserPresent=dataArr?.some(dataObj=>dataObj.email===userData.email);

       if(!isUserPresent){
        res.send("User email does not exist");
        return;
       }

       const isCorrectPassword= dataArr?.some(dataObj=>dataObj.password===userData.password);
       
       if (!isCorrectPassword)
       {
        res.send("Incorrect password");
        return;
       }
       let payload={
        subject:userData.email
    }
    let token= jwt.sign(payload,"test");
    res.send({token});

    })

});


//api for calling producst data
router.get("/productData", (req,res)=>{
    fs.readFile("products.json", "utf-8", (err, data)=>{
        let ProddataArr=[];

        if(err){
            res.send(err);
            return;
        }
        ProddataArr= JSON.parse(data);
       
        
    })
});

//exporting the routing using module.exports
module.exports=router;