const express = require('express');
const ProductController = require ('../controller/product.controller');
const upload = require('../utils/multer');
const router = express.Router();
const productController = new ProductController();

//Create Product 
router.post(
    "/product/create",
    upload.single("image"),
    productController.CreateProduct
);

// Get All Product 
router.get(
    "/product/get",
    productController.getProduct
);

//Get Single Product
router.get(
    "/product/:id",
    productController.getsingleProduct
);

//Update Product
router.put(
    "/product/update/:id",
    upload.single("image"),
    productController.updateProduct
);

//Delete Product
router.delete(
    "/product/delete/:id",
    productController.deleteProduct
);

module.exports = router;




















