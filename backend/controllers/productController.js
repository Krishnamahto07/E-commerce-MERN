const Product = require("../model/productModel");
// const { param } = require("../routes/productRoute");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync")

//create product Route
exports.createProduct = catchAsync( async(req,res,next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});
    // try{
    //     // const {title,description} =req.body; 
    //     const product = await Product.create(req.body);

    //     res.status(200).json(
    //         {
    //             success:true,
    //             data:product,
    //             message:"Entry created successfull"
    //         }
    //     )
    // }
    // catch(err){
    //     console.error(err);
    //     console.log(err);
    //     res.status(500).json(
    //         {
    //             success:false,
    //             data:"Internal server error",
    //             message:err.message,
    //         }
    //     )
    // }


// GetAllProduct route
exports.getAllProducts = catchAsync( async(req,res) =>{
    const products = await Product.find();

    res.status(200).json(
        {
            success:true,
            products
        }
    )
})

// Update Product for Admin

exports.updateProduct = catchAsync( async (req,res,next) =>{
    let product = Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        status:true,
        product
    })
})

// Delete Product

exports.deleteProduct = catchAsync( async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
    else {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        console.log("Item deleted");
    }
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

// Find Product
exports.getProduct = catchAsync( async (req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Available",404));
    }
    else{
        console.log("Product Founded");
    }
    res.status(200).json({
        success:true,
        product
    })
})