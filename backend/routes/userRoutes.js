import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controllers/userController.js";
import {
    authenticate,
    adminAuthorize
} from "../middlewares/authMiddleware.js";


const router = express.Router();



router
    .route("/")
    .post(createUser)
    .get(authenticate, adminAuthorize, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);




router
    .route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);



// admin routes
router
    .route("/:id")
    .delete(authenticate, adminAuthorize, deleteUserById)
    .get(authenticate, adminAuthorize, getUserById)
    .put(authenticate, adminAuthorize, updateUserById);


export default router;