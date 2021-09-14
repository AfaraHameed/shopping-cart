const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
var userHelper  =require('../helpers/user-helpers')
/* GET home page. */
router.get('/',async function(req, res, next) {

  let user=req.session.user 
  console.log(user)
  let cartCount=null
  if(user){
  cartCount=await userHelper.getCartCount(req.session.user._id)
  }
  console.log('cartcount:'+cartCount)
  productHelper.getAllProducts().then((product)=>{
    res.render('user/view-products',{product,user,cartCount})
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
    req.session.loggedIn=true
    req.session.user = response

    res.redirect('/')
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
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{
    res.redirect('/login')
  }
}

router.get('/cart',verifyLogin,(req,res)=>{
  console.log('cart')
  userHelper.getCartProducts(req.session.user._id).then((products)=>{
    console.log('products:'+products)
    res.render('./user/cart',{products,user:req.session.user})
  })
  
}) 
// router.get('/cart',verifyLogin,async(req,res)=>{
//   let products=await userHelper.getCartProducts(req.session.user._id)
//   console.log(products)
//   res.render('./user/cart',{products,user:req.session.user._id})
// })
router.get('/add-to-cart/:id',(req,res)=>{
  console.log('api call')
   userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{
   //res.redirect('/')
   res.json({status:true})
  })
})

module.exports = router;
