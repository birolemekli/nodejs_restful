const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

// Load User Model
const User=require('../models/User');


module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'}, (email,password,done) =>{
            // User kontrolü
             User.findOne({email:email})
                .then(user=>{
                    if(!user){
                        return done(null,false,{message:' Bu mail adresi kayıtlı değildir'});
                    }

                    // Şifre kontrolü
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            return done(null,user);
                        }
                        else{
                            return done(null,false,{message:' Yanlış şifre'});
                        }
                    });
                })
                .catch(err=>console.log(err));
        }) 
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
 
}