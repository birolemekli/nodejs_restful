const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');


// User Model
const User =require('../models/User');

// Login Sayfası
router.get('/login',function(req,res){
    res.render('login');
});

// Register  Sayfası
router.get('/register',function(req,res){
    res.render('register');
});


// Register Post işlemi
router.post('/register',function(req,res){
    const {name,email,password,password2 } =req.body;
    let errors=[];

    // Değer kontrolü
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Tüm alanları doldurmalısınız'});
    }

    // Password alanları eşitmi kontrolü
    if(password!==password2)
    {
        errors.push({msg:' Şifreler eşleşmiyor'});
    }

    // Password uzunluk kontrolü
    if(password.length<6){
        errors.push({msg:' Şifre en az 6 karakter uzunluğunda olmalı'});
    }

    // Hata varsa aynı sayfada kal
    if(errors.length>0){
        res.render('register',{
           errors,
           name,
           email,
           password,
           password2
        });
    }
    else{
        // Bilgilerde eksiklik yok ise çalışır
        User.findOne({email:email})
            .then(user=>{
                if(user){
                    // Mail adresi var ise kayıt yapılmaz
                    errors.push({msg:'Mail adresi sistemde zaten kayıtlıdır.'});
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                     });
                }
                else{
                    const newUser=new User({
                        name,
                        email,
                        password
                    });
                    
                    // Şifre hashleme
                    bcrypt.genSalt(10,(err,salt)=>
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err) throw err;
                            newUser.password=hash;

                            // Kullanıcı kayıt etme işlemi
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg','Kayıt başarılı olmuştur giriş yapabilirsiniz');
                                    res.redirect('/users/login');
                                })
                                .catch(err=>console.log(err));
                    }));
                }
            });
    }
});

// Login Kontrolü
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
});


// Logout 
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','Çıkış yaptınız');
    res.redirect('/users/login');
}); 

module.exports=router;