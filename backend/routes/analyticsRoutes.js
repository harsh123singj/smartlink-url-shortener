import express from "express";

import { getUrlAnalytics } from "../controllers/analyticsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/:urlId",
    authMiddleware,
    getUrlAnalytics
);

export default router;