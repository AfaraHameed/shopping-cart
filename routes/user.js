const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
var userHelper  =require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {

  let user=req.session.user
  console.log(user)
  productHelper.getAllProducts().then((product)=>{
    res.render('user/view-products',{admin:false,product,user})
  })
  
  
});
router.get('/login',function(req,res){
  if(req.session.loggedIn){
    res.redirect('/')
  }
  else{
  res.render('user/login',{"loginErr":req.session.loginErr})
  req.session.loginErr=false
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelper.doSignup(req.body).then((response)=>{
    console.log(response)
    res.render('user/view-products')
  })

})

router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    console.log(response)
    if(response.status){
      req.session.loggedIn=true
      req.session.user = response.user

      res.redirect('/')
    }
    else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
 
})
router.get('/logout',(req,res)=>{

  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',(req,res)=>{
  console.log('cart')
})
module.exports = router;
