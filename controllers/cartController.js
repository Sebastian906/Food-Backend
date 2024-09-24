import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Buscar al usuario por ID
        let userData = await userModel.findById(req.body.userId);
        // Asegurarse de que cartData esté inicializado
        let cartData = userData.cartData || {};
        // Verificar si el producto ya está en el carrito
        if (!cartData[req.body.itemId]) {
            // Si no está, inicializar con cantidad 1
            cartData[req.body.itemId] = 1;
        } else {
            // Si ya está, incrementar la cantidad
            cartData[req.body.itemId] += 1;
        }
        // Actualizar el carrito en la base de datos
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // Devolver respuesta exitosa
        res.json({ success: true, message: "Producto agregado al carrito" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error al agregar al carrito" });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Se removió del carrito"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart, removeFromCart, getCart}