var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let products=[
    {
      name:"Aagyeyi Fabulous Kurtis",
      category:"Kurtis",
      Description:"Fabric:Rayon\nSleeve Length:Three-Quarter Sleeves\nPattern:Embroidered",
      image:"https://images.meesho.com/images/products/42511545/dzye1_512.jpg"
    },
    {
      name:"Bbanita Ensemble Kurtis",
      category:"Kurtis",
      Description:"Fabric:Cotton \nSleeve Length:Three-Quarter Sleeves",
      image:"https://images.meesho.com/images/products/42232997/ujudp_512.jpg"
    },
    {
      name:"C kurtis",
      category:"Kurtis",
      Description:"Fabric:Rayon\nSleeve Length:Three-Quarter Sleeves\nPattern:Printed",
      image:"https://images.meesho.com/images/products/42691244/hhu3a_512.jpg"
    },
    {
      name:"Adrika Alluring Kurtis",
      category:"Kurtis",
      Description:"Fabric:Cotton\nSleeve Length:Three-Quarter Sleeves\nPattern:Printed",
      image:"https://images.meesho.com/images/products/42511545/dzye1_512.jpg"
    }
  ]
  res.render('index', {products,admin:false});
});

module.exports = router;
