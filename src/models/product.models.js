const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },

    image: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
}, {
    timestamps: true
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel




































