const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct ,getProduct } = require("../controllers/productController");
// const {createProduct} = require("../controllers/productController")
const router = express.Router();

router.route("/products").get(getAllProducts);
// router.route("/product/new").post(createProduct);
router.post("/createproduct",createProduct);
router.route("/product/:id").put(updateProduct).get(getProduct).delete(deleteProduct);
// router;
// router.;

module.exports = router