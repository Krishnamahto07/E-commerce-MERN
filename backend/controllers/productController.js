const Product = require("../model/productModel");
// const { param } = require("../routes/productRoute");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");
const ApiFeatures = require("../utils/apifeatures");

//create product Route
exports.createProduct =  async(req,res,next) => {
    try {
        req.body.user = req.user.id;

        const product = await Product.create(req.body);
    
        res.status(201).json({
            success:true,
            product
        });
        console.log("Product create successfully ");
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error in product cretion"
        })
    }
};
    


// GetAllProduct route
exports.getAllProducts = async(req,res) =>{
    try {
        const resultPerPage = 5;
        const productCount = await Product.countDocuments();

        const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
        
        const products = await apiFeatures.query;
        res.status(200).json(
            {
                success:true,
                message:products
            }
        )
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error in Get All products"
        })
    }
    
}

// Find Product
exports.getProduct = async (req,res,next) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not found"
            })
        }
        else{
            console.log("Product Founded");
        }
        res.status(200).json({
            success:true,
            message:product,
            // productCount
        })
    }catch(error){
        // console.log("Error occured in get product details",error);
        return res.status(500).json({
            success:false,
            message:"Error occured in get product details"
        })
    }
}

// Update Product for Admin

exports.updateProduct = async (req,res,next) =>{
    try {
        // let product = Product.findById(req.params.id);
        let product = await Product.findById(req.params.id);


        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product Not Found"
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
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error in Update Product"
        })
    }
}

// Delete Product

exports.deleteProduct =  async (req,res,next) =>{
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occured in Delete Product"
        })
    }
    
}


// Create Review or Update Review

exports.createProductReview = async(req,res,next) =>{
    try {
        const {rating , comment , productId} = req.body;
        const review = {
            user:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
        if(isReviewed){
            product.reviews.forEach((rev) => {
                if(rev.user.toString() === req.user._id.toString())
                    (rev.rating = rating), (rev.comment = comment)
            });
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }

        // Average Rating of Review
        let avg = 0;    
        product.ratings = product.reviews.forEach(rev =>{
            avg+=rev.rating
        })
        
        product.ratings = avg/product.reviews.length;

        await product.save({ validateBeforeSave : false});

        res.status(200).json({
            success:true,
            message:"Created Product Review Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Created Product Review"
        })
    }
}

// Get All Review of a Product

exports.getProductReviews = async(req,res,next) =>{
    try {
        const product = await Product.findById(req.query.id);

        if(!product) {
            return res.status(400).json({
                success:false,
                message:"Product Not Found"
            })
        }
        res.status(200).json({
            success:false,
            message:"Reviews are",
            reviews:product.reviews,
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Get Product By Reviews"
        })
    }
}

// Deleter Review

exports.deleteReview = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.query.productId);

        if(!product) {
            return res.status(400).json({
                success:false,
                message:"Product Not Found"
            })
        }

        const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

        // Average Rating of Review
        let avg = 0;    
        reviews.forEach(rev =>{
            avg+=rev.rating;
        });
        
        const ratings = avg / reviews.length;

        const numOfReviews = reviews.length;
        
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success:true,
            message:"Review Deleted"
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            message:"Error in Delete Product Reviews"
        })
    }
}