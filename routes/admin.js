var express = require('express');
var router = express.Router();
var productHelper= require('../helpers/product-helpers'); 
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
router.get('/delete-product',(req,res)=>{
  let proId=req.query.id
  console.log(proId)
  console.log(req.query.name)
}
)
module.exports = router;

