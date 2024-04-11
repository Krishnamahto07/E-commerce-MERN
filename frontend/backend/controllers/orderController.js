const Order = require("../model/orderModel")
const Product = require("../model/productModel")


// Create New Order
exports.newOrder = async(req,res,next) =>{
    try {
        const {shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , 
        shippingPrice, totalPrice} = req.body;

        console.log("req se data le liya");

        const order = await Order.create({
            shippingInfo, 
            orderItems, 
            paymentInfo, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id,
        });

        res.status(201).json({
            success:true,
            order,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in new Order in Order Controller "
        })
    }
}

// get Single Order
exports.getSingleOrder = async(req,res,next) =>{
    try {
        const order = await Order.findById(req.params.id).populate("user","name email");

        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found !"
            })
        }
        res.status(200).json({
            success:true,
            order,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Get Single Order"
        })
    }
}

// get logged in user Orders
exports.myOrders = async(req,res,next) =>{
    try {
        const orders = await Order.find({user : req.user._id});

        if(!orders){
            return res.status(400).json({
                success:false,
                message:"Order not found !"
            })
        }
        res.status(200).json({
            success:true,
            orders,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in My Order"
        })
    }
}


// get all  Orders --Admin
exports.getAllOrders = async(req,res,next) =>{
    try {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) =>{
            totalAmount+=order.totalPrice;
        });

        res.status(200).json({
            success:true,
            totalAmount,
            orders,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Get All Order"
        })
    }
}



// get Update  Order Status --Admin
exports.updateOrder = async(req,res,next) =>{
    try {
        const order = await Order.findById(req.params.id);

        if(order.orderStatus === "Delivered"){
            return res.status(400).json({
                success:false,
                message:"You have Already Delivered this Order"
            })
        }
        order.orderItems.forEach( 
        async(o)  => {
            await updateStock(o.product,o.quantity); // await lagana hai
        })

        order.orderStatus = req.body.status;

        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }
        
        await order.save({validateBeforeSave : false});

        res.status(200).json({
            success:true,
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Update Order"
        })
    }
}

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock-=quantity;

    await product.save({ validateBeforeSave:false})
}

// Delete  Orders --Admin
exports.deleteOrder = async(req,res,next) =>{
    try {
        const orders = await Order.findById(req.params.id);

        if(!orders){
            return res.status(400).json({
                success:false,
                message:"Order not found !"
            })
        }

        await Order.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success:true,
            message:"Delete successfully",
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Delete Order"
        })
    }
}