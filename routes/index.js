const express=require('express');
const bcrypt=require('bcryptjs');
const router=express.Router();

const {ensureAuthenticated}=require('../config/auth');
// User Model
const User =require('../models/User');
// Welcome Page
router.get('/',function(req,res){
    res.render('welcome')
})

// Dashboard kullanıcı listeleme
router.get('/dashboard',ensureAuthenticated,function(req,res){
    User.find(function(err,result){
        if(err)
        {
            console.log('kullanicilarListesi Hata');
        }
        else{
            res.render('dashboard',{
                name:req.user.name,
                kullanicilar:result
            })
        }
    });
});

// Dashboard kullanıcı silme
router.get('/dashboard/:id',ensureAuthenticated,(req,res)=>{
    User.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log("Silmede hata");
        }
        else
        {
            res.redirect('/dashboard');
        }
    });
});

// Dashboard kullanıcı güncelleme
router.get('/dashboard/edit/:id',ensureAuthenticated,(req,res)=>{
    User.findById(req.params.id,function(err,result){
        if(err)
        {
            console.log('kullanicilarListesi Hata');
        }
        else{
            res.render('edit',{kullanicilar:result});
        }
    });  
});

// Dashboard kullanıcı güncelleme
router.post('/dashboard/edit/:id',(req,res)=>{
    var updateKullanici={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };
        bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(updateKullanici.password,salt,(err,hash)=>{
                if(err) throw err;
                updateKullanici.password=hash;
            User.findByIdAndUpdate(req.params.id,updateKullanici,function(err){
                    if(err)
                    {
                        console.log("kullaniciGuncellePost hata");
                    }
                    else
                    {
                        res.redirect('/dashboard');
                    }
                });
        }));    
});

module.exports=router;