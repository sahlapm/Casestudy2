

// Task1: initiate app and run server at 3000
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const { EmployeeModel } = require('./model/employee');
const path=require('path');
var app=new express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extented:false}));
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.listen(3000,()=>
{
    console.log("Server listening to port 3000");
}
)
// Task2: create mongoDB connection 

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sahla:sahlaAtlas@cluster0.2wlvq8k.mongodb.net/EmployeeDB?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try
    {
      const data = await EmployeeModel.find();
      res.json(data);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async(req,res)=>{
    try
    {
      
        let id=req.params.id;
        const data =await EmployeeModel.findOne({"_id": id});
        res.json(data);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

        app.post('/api/employeelist',async(req,res)=>{
        const data= new EmployeeModel({
            name :req.body.name,
            location: req.body.location,
            position :req.body.position,
            salary : req.body.salary
          });
          try
          {
           
            const result=await data.save();
            res.status(200).json(result);
          }
          catch(err)
          {
            res.status(400).json({message:err.message});
          }
     
       
    })

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try
    {
        let id=req.params.id;
        var data=req.body;
       const result= await EmployeeModel.findOneAndDelete({"_id":id},data);
       res.send(result);
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
})

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{

  try
{
    var id=req.body._id;
    var data=req.body;
    const result= await EmployeeModel.updateOne({"_id":id},data);
    res.send(result);
}
catch(err)
{
    res.status(400).json({message:err.message});
}
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



