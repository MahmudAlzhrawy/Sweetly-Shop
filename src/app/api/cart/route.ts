import Cart from "@/models/Cart";
import Product from "@/models/Products";

export async function POST(req){
    const {productId, quantity,userId} = await req.json();

    const cart = await Cart.findOne({ userId: userId });
 if (!userId || !productId || !quantity) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    if (!cart) {
        // If no cart exists for the user, create one
        const newCart = new Cart({
            userId: userId,
            items: [{product:productId, quantity }]
        });
        await newCart.save();
    } else {
        // If cart exists, update it
        const itemIndex = cart.items.findIndex(
            (item) => item.product._id.toString() === productId
        );
        if (itemIndex !== -1) {
            // If item exists in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If item doesn't exist in cart, add it
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }

    return new Response("Cart updated", { status: 200 });
}
export async function GET(req) {
   const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
    const cart = await Cart.findOne({ userId: userId })
    .populate({
            path: "items.product",
            model: Product,
            select: "name price image ",
        });
        console.log("userId:", userId);
    if (!cart) {
        return new Response("Cart not found", { status: 404 });
    }

    return new Response(JSON.stringify(cart), { status: 200 });
}

export async function PATCH(req) {
    const { userId, productId,status } = await req.json();

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        return new Response("Cart not found", { status: 404 });
    }

    const itemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
    if (itemIndex !== -1) {
        if(status==="INCREMENT"){
            cart.items[itemIndex].quantity += 1;
        }else if(status==="DECREMENT" && cart.items[itemIndex].quantity>1){
            cart.items[itemIndex].quantity -= 1;
        }
    }

    await cart.save();
    return new Response("Cart item updated", { status: 200 });
}
export async function DELETE(req) {
    const { userId, productId } = await req.json();

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        return new Response("Cart not found", { status: 404 });
    }
    if(!productId || productId==="ALL"){
        cart.items = [];
        await cart.save();
        return new Response("Cart cleared", { status: 200 });
    }
    cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
    await cart.save();

    return new Response("Cart item removed", { status: 200 });
}