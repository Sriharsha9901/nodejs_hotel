const passport=require('passport');
const Person=require('./models/Person');

const localStrategy=require('passport-local').Strategy; //for username & password authentication

passport.use(new localStrategy(async (username, password, done)=>{
    try{
        // console.log('entered credentials:', username, password);
        
        const user=await Person.findOne({username:username});

        if(!user){
            return done(null,false,{message: 'Incorrect username'});
        }

        const isPasswordMatch=await user.comparePassword(password);

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false, {message:'Incorrect password'});
        }
    }catch(err){
            return done(err);
    }
}))

module.exports=passport;