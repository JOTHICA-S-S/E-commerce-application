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
            res.status(500).send("error while reading the file");
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
            res.status(409).send("user already exists");
            return;
        }

        //is there is not err, and the useer does not alrady exist, then we have to add the entered data into our existing file system.
        dataArr.push(userdata);
        //we have to conert the array into string format
        const content=JSON.stringify(dataArr);
        fs.writeFile("data.json", content, err=>{
            if(err){
                res.status(500).send("error while writing in file");
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
            res.status(500).send("error while reading the file");;
            return;
        }

        if(!data)
        {
            res.status(404).send("user data not found");
            return;
        }

       const dataArr=JSON.parse(data);
       const isUserPresent=dataArr?.some(dataObj=>dataObj.email===userData.email);

       if(!isUserPresent){
        res.status(404).send("User email does not exist");
        return;
       }

       const isCorrectPassword= dataArr?.some(dataObj=>dataObj.password===userData.password);
       
       if (!isCorrectPassword)
       {
        res.status(401).send("Incorrect password");
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
// after cerating the verifyToken fucntion, we have to add it in productData api, to verify the token,
// only if the token is verifiued one, then the api called will be continued.(i.e) we will be able to send the response to the front end.
router.get("/productData",verifyToken, (req,res)=>{
    fs.readFile("products.json", "utf-8", (err, data)=>{
        let ProddataArr=[];

        if(err){
            res.send(err);
            return;
        }
        ProddataArr= JSON.parse(data);
        res.send(ProddataArr);
    })
});

//endpoint to update the incart product property
router.put("/updateCart/:id",verifyToken,(req,res)=>{

    //first read the existing file
    fs.readFile("products.json","utf-8",(err,data)=>{
        //first get the product id from req
        const productId=parseInt(req.params.id);
        const inCartValue = req.body.inCart;


        //check if there is any error
        if(err){
            res.status(500).send("error while reading the file");
            return;
        }

        //if error is not there, update the json file
        //parse the data first
        let products=JSON.parse(data);

        //find the product for which you have to update the incart value
        let product=products.find(p=>p.id=== productId);

        if (!product)
        {
            res.status(404).send("Product Not Found");
            return;
        }

        product.inCart=inCartValue;

        //Update the file
        fs.writeFile("products.json",JSON.stringify(products), (err)=>{
            if (err){
                res.send(err);
                return;
            }
            res.status(500).send("error while writing the file");
        });

    });
});

function verifyToken(req,res, next)
{
    //checking whther the request headers has authorization key or not
    if(!req.headers.authorization)
    {
        res.status(404).send("unathorized request");
    }

    //if it has authorization key, then we are getting the token from the key by splitting it
    let token=req.headers.authorization.split(" ")[1];

    // if the token which we split is null, then unauthorized access,
    if (token==='null')
    {
        res.status(404).send("unathorized request");
    }

    //if, token is present, then we have to verify the token using payload, using verify method of jwt
    let payload=jwt.verify(token,"test");
    if(!payload){
        res.status(404).send("unathorized request");
    }

    //if payload is present , then we have to call the next method, that, is the products api call can be continued
    
    next();
}

//exporting the routing using module.exports
module.exports=router;