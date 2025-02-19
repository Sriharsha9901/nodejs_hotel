const mongoose=require('mongoose');

const menuSchema=mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    typeOfItem:{
        type:String,
        enum:['biryani','curry','roti','dessert','starter'],
        required:true
    }

})

const Menu=mongoose.model('Menu',menuSchema);

module.exports=Menu;