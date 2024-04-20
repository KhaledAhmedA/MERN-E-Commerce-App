import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";



// add product (admin)
// method POST
// path: http://localhost:5000/api/products
const addProduct = asyncHandler(async (req, res) => {

    try {

        const { name, description, price, category, quantity, brand } = req.fields;

        // validation
        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });

            case !description:
                return res.json({ error: "Description is required" });

            case !price:
                return res.json({ error: "Price is required" });

            case !category:
                return res.json({ error: "Category is required" });

            case !quantity:
                return res.json({ error: "Quantity is required" });

            case !brand:
                return res.json({ error: "Brand is required" });
        };

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }

});



// update product (admin)
// method PUT
// path: http://localhost:5000/api/products:id
const updateProductDetails = asyncHandler(async (req, res) => {

    try {

        const { name, description, price, category, quantity, brand } = req.fields;

        // validation
        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });

            case !description:
                return res.json({ error: "Description is required" });

            case !price:
                return res.json({ error: "Price is required" });

            case !category:
                return res.json({ error: "Category is required" });

            case !quantity:
                return res.json({ error: "Quantity is required" });

            case !brand:
                return res.json({ error: "Brand is required" });
        };

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.fields },
            { new: true }
        );

        await product.save();

        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }

});



// delete product (admin)
// method DELETE
// path: http://localhost:5000/api/products:id
const removeProduct = asyncHandler(async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error while deleting product" });
    }

});



// get all product (public)
// method GET
// path: http://localhost:5000/api/products
const fetchProducts = asyncHandler(async (req, res) => {

    try {

        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        } : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error while getting all products" });
    }

});



// get product by id (public)
// method GET
// path: http://localhost:5000/api/products/:id
const fetchProductById = asyncHandler(async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (product) {
            return res.json(product);
        } else {
            res.status(404);
            throw new Error("Product Not Found")
        }

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Server Error while getting product" });
    }

});



// get all products (public)
// method GET
// path: http://localhost:5000/api/products/allproducts
const fetchAllProducts = asyncHandler(async (req, res) => {

    try {

        const products = await Product.find({})
            .populate("category").limit(12).sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error while getting all products" });
    }

});




// review product (auth)
// method POST
// path: http://localhost:5000/api/products/:id/reviews
const addProductReview = asyncHandler(async (req, res) => {

    try {

        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {

            const alreadyReviewed = product.reviews.find(revi =>
                revi.user.toString() === req.user._id.toString());

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("You Already Reviewed This Product");
            };

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating = product.reviews.reduce(
                (acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review Added" });


        } else {
            res.status(404);
            throw new Error("Product Not Found");
        }

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }

});



// top products (public)
// method GET
// path: http://localhost:5000/api/products/top
const fetchTopProducts = asyncHandler(async (req, res) => {

    try {

        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }

});



// new products (public)
// method GET
// path: http://localhost:5000/api/products/new
const fetchNewProducts = asyncHandler(async (req, res) => {

    try {

        const products = await Product.find().sort({ _id: -1 }).limit(5);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }

});



// filtered products (public)
// method POST
// path: http://localhost:5000/api/products/filtered-products
const filterProducts = asyncHandler(async (req, res) => {
    try {

        const { checked, radio } = req.body;
        let args = {};

        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], lte: radio[1] };

        const products = await Product.find(args);
        res.json(products);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error while filter products" });
    }
});



export {
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
};