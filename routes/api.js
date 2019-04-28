const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');

const User =require('../models/User');

router.get('/',function(req,res){
    res.send('Api Ana Sayfa');
});

// Create Yeni Kullanıcı oluşturma
router.post('/users', function (req, res) {
    //Hash Password
    bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err) throw err;
            // Şifre hashleme
            req.body.password=hash;

            User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            }, 
            function (err, user) {
                if (err) return res.status(500).send("Bilgileri veritabanına eklerken bir sorun oluştu.");
                res.status(200).send(user);
            });       
    }));
});

// Tüm kullanıcıları getirme
router.get('/users',function(req,res){
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Kullanıcıları görüntülemede bir sorun oluştu");
        res.status(200).send(users);
    });
});


// Tek bir kullanıcı görüntüleme
router.get('/users/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Kullanıcıyı bulurken bir sorun oluştu");
        if (!user) return res.status(404).send("Kullanıcı mevcut değil");
        res.status(200).send(user);
    });
});


// Kullanıcı silme Delete
router.delete('/users/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Kullanıcı silmede bir hata oluştu");
        res.status(200).send("Kullanıcı : "+ user.name +" silindi.");
    });
});



// Kullanıcı güncelleme
router.put('/users/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Kullanıcı güncellemede bir hata oluştu.");
        res.status(200).send(user);
    });
});


module.exports=router;