const mongoose=require('mongoose');

const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number
    }

})

const Person=mongoose.model('Person',personSchema);

module.exports=Person;