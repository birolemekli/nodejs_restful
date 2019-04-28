module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Bu sayfaya erişim için giriş yapmanız gerekmektedir');
        res.redirect('/users/login');
    }
}