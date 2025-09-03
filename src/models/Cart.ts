import { models,model ,Schema } from "mongoose";
const cartSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    items: [
        {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
        }
    ]
})

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
