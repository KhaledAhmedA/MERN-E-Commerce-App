import express from "express";
const router = express.Router();
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered
} from "../controllers/orderController.js";
import { authenticate, adminAuthorize } from "../middlewares/authMiddleware.js";



router.route("/")
    .post(authenticate, createOrder)
    .get(authenticate, adminAuthorize, getAllOrders);


router.route("/mine").get(authenticate, getUserOrders);

router.route("/total-orders").get(countTotalOrders);

router.route("/total-sales").get(calculateTotalSales);

router.route("/total-sales-by-date").get(calculateTotalSalesByDate);

router.route("/:id").get(authenticate, findOrderById);

router.route("/:id/pay").put(authenticate, markOrderAsPaid);

router.route("/:id/deliver").put(authenticate, adminAuthorize, markOrderAsDelivered);




export default router;