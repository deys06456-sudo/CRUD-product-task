const Product = require('../models/product.models');

class ProductController {
    async CreateProduct(req, res) {
        try {
            const { name, description, price, category, inStock } = req.body;
            if (!name || !description || !price || !category || inStock === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "All Fields are required"
                });
            }

            // Image required
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Product image is required"
                });
            }

            //Create Product Object
            const productdata = new Product({
                name,
                description,
                price,

                // Multer image
                image: req.file.filename,

                category,
                inStock
            });

            //Save Product into MongoDB 
            const data = await productdata.save();

            //Send Success Response 
            return res.status(201).json({
                success: true,
                message: "Product Create Successfully",
                data: data,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    //Get All Product 
    async getProduct(req, res) {
        try {
            const getproduct = await Product.find();
            return res.status(200).json({
                success: true,
                message: "Product festched successfully",
                total: getproduct.length,
                data: getproduct,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    //Get Single Product
    async getsingleProduct(req, res) {
        try {
            const id = req.params.id;
            const getSingleData = await Product.findById(id);

            if (!getSingleData) {
                return res.status(400).json({
                    success: false,
                    message: "Data not Found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Get single data",
                data: getSingleData
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    //Update Product
    async updateProduct(req, res) {
        try {
            const id = req.params.id;

            const { name, description, price, category, inStock } = req.body;

            // Create update object
            const updateData = {
                name,
                description,
                price,
                category,
                inStock
            };

            // New image uploaded
            if (req.file) {
                updateData.image = req.file.filename;
            }

            const updateProduct = await Product.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updateProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updateProduct
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    //Delete Product
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const deleteProduct = await Product.findByIdAndDelete(id);
            if (!deleteProduct) {
                return res.status(400).json({
                    success: false,
                    message: "Product not Found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                data: deleteProduct

            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = ProductController;



























































































