const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save',async function(next){
    const person=this

    //Hash the password only if it is modified or new
    if(!person.isModified('password'))return next();

    try{
        //to generate salt
        const salt=await bcrypt.genSalt(10);

        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);

        //override the plain password with hash password
        person.password=hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword= async function(candidatePassword){
    try{

        //compare password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

const Person=mongoose.model('Person',personSchema);

module.exports=Person;