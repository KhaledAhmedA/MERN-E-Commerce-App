import express from "express";

// formidable for dealing with form data
import formidable from "express-formidable";

const router = express.Router();

// controllers
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
} from "../controllers/productController.js";

import {
    authenticate,
    adminAuthorize
} from "../middlewares/authMiddleware.js";

import checkId from "../middlewares/checkId.js";


router.route("/")
    .get(fetchProducts)
    .post(authenticate, adminAuthorize, formidable(), addProduct);




router.route("/allproducts").get(fetchAllProducts);



router.route("/:id/reviews")
    .post(authenticate, checkId, addProductReview);



router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);



router.route("/:id")
    .get(fetchProductById)
    .put(authenticate, adminAuthorize, formidable(), updateProductDetails)
    .delete(authenticate, adminAuthorize, removeProduct);



router.route("/filtered-products").post(filterProducts);



export default router;