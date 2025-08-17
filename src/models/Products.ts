import {model ,Schema,models} from'mongoose';
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Product", "Offer"],
        default: "Product"
    },
    category:{
        type: String,
        required: true,
        enum: ["Cakes", "Pastries", "Cookies", "Breads", "Desserts"],
        default: "Desserts"
    }

}, { timestamps: true });

const Product = models.Product || model('Product', productSchema);
export default Product;
