import express from "express";
const router = express.Router();
import {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    readCategory
} from "../controllers/categoryController.js";
import {
    authenticate,
    adminAuthorize
} from "../middlewares/authMiddleware.js";


router.route("/")
    .post(authenticate, adminAuthorize, createCategory);

router.route("/:categoryId")
    .put(authenticate, adminAuthorize, updateCategory)
    .delete(authenticate, adminAuthorize, deleteCategory);

// router.route("/:categoryId").delete(authenticate, adminAuthorize, deleteCategory);


router.route("/categories")
    .get(listCategory);

router.route("/:id").get(readCategory);

export default router;