const express=require('express');
const router=express.Router();
const person=require('./../models/Person');
//to add a person
router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newPerson=new person(data);

        const response= await newPerson.save();
        console.log('person saved successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})   
    }
})
//to get all person
router.get('/',async (req,res)=>{
    try{
        const response= await person.find();
        console.log('Person fetched successfully');
        res.status(200).json(response);
    }catch(err){ 
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
//to get specific person
router.get('/:workType',async (req,res)=>{
    try{
        const work=req.params.workType;
        if(work=='chef'||work=='manager'||work=='waiter'){
            const response= await person.find({work:work});
            console.log('Person fetched successfully');
            res.status(200).json(response);
        }else{
            console.log('invalid work type');
            res.status(200).json({error:'invlaid work type'});
        }

       
    }catch(err){ 
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
//to update person
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePerson=req.body;
        const response=await person.findByIdAndUpdate(personId,updatePerson,{ 
            new: true,         // Return the updated document
            runValidators: true // Ensure validation rules are applied
        });
        if(!response){
            console.log("Person not found");
            res.status(500).json({error:'invalid id'});
        }

        console.log("Person data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'person not updated'})
    }
})
//to delete person
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId);
        if(!response){
            console.log("Person not found");
            res.status(500).json({error:'invalid id'});
        }
        console.log("Person data deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'person not deleted'})
    }
})
module.exports=router;