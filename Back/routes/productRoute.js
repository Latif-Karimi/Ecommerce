import express from 'express'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'


const router = express.Router()

//Routes
//create product
router.post("/create-product",  
    requireSignIn, 
    isAdmin, formidable(), createProductController)
//All product
router.get("/get-product",getProductController)

//Single product
router.get("/get-product/:slug",getSingleProductController)
//get photo
router.get('/product-photo/:pid',productPhotoController)

//Delete product
router.delete("/delete-product/:pid",deleteProductController) 

//update product
router.put("/update-product/:pid",  
    requireSignIn, 
    isAdmin, formidable(), updateProductController)


export default router