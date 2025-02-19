const express=require('express');
const router=express.Router();
const menu=require('./../models/Menu');
//to add item
router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newMenu=new menu(data);

        const response= await newMenu.save();
        console.log('Item saved successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})   
    }
})
//to fetch all items
router.get('/',async (req,res)=>{
    try{
        const response= await menu.find();
        console.log('Item fetched successfully');
        res.status(200).json(response);
    }catch(err){ 
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
//to fetch specific item 
router.get('/:itemType',async(req,res)=>{
    try{
        const itemType=req.params.itemType;
        const response= await menu.find({typeOfItem:itemType});
        console.log('Item fetched successfully');
        res.status(200).json(response);
    }catch(err){ 
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
//to update item
router.put('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const updatedItem=req.body;
        const response=await menu.findByIdAndUpdate(itemId,updatedItem,{ 
            new: true,         // Return the updated document
            runValidators: true // Ensure validation rules are applied
        });
        if(!response){
            console.log("Item not found");
            res.status(500).json({error:'invalid id'});
        }

        console.log("Item data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Item not updated'})
    }
})
//to delete item
router.delete('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const response=await menu.findByIdAndDelete(itemId);
        if(!response){
            console.log("item not found");
            res.status(500).json({error:'invalid id'});
        }
        console.log("item data deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'item not deleted'})
    }
})
module.exports=router;