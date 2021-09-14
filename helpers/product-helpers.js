var db = require('../config/connection')
var collection=require('../config/collections')
var objectId = require('mongodb').ObjectId
const { response } = require('express')
module.exports={
    addProduct:(product,callback)=>{
    console.log(product)
    db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
        console.log(data)
        console.log('product id:'+product._id)
        callback(product._id)
    })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(product)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            console.log("object id:"+objectId(proId))
            
        
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
                resolve(response)
            })
                
                
            
        
        })
    },
    getProductDetails:(proId)=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                console.log(product)
                resolve(product)
            })
        })
    },
    updateProduct:(proId,productDetails)=>{
        return new Promise((resolve,reject)=>{
             db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
            $set:{name:productDetails.name,
                Category:productDetails.Category,
                discription:productDetails.discription,
                price:productDetails.price,
               

            }
        }
            ).then((response)=>{
                resolve()
            })
        })

    }

}  