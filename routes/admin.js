const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper= require('../helpers/product-helpers'); 
const fs = require('fs')
/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelper.getAllProducts().then((product)=>{
    console.log(product)
    res.render('admin/view-products',{admin:true,product})
  })
  
});
router.get('/add-product',function(req,res){
   res.render('admin/add-product')
});
router.post('/add-product',(req,res)=>{
  console.log('body')
  console.log(req.body)
  console.log(req.files.image)
  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product')
      }
      else{
        console.log(err)
      }
    })
   
  });
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log("proId:"+proId)
  productHelper.deleteProduct(proId).then((response)=>{
   
    const path = './public/product-images/'+proId+'.jpg'

try {
  fs.unlinkSync(path)
  console.log("Deleted")
} catch(err) {
  console.error(err)
}
    res.redirect('/admin')
  })
}
)
router.get('/edit-product/:id',(req,res)=>{
  productHelper.getProductDetails(req.params.id).then((product)=>{
    res.render('admin/edit-product',{product})
  })
 
})
router.post('/edit-product/:id',(req,res)=>{
  productHelper.updateProduct(req.params.id,req.body).then(()=>{
    console.log('updated body:'+req.body)
    res.redirect('/admin')
    if(req.files.image)
    {
      let image=req.files.image
      image.mv('./public/product-images/'+req.params.id+'.jpg')
    }
  })
})
module.exports = router;

