import express from "express";

import {
    createShortUrl,
    getUserUrls,
    getSingleUrl,
    updateUrl,
    deleteUrl
} from "../controllers/urlController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create URL
router.post(
    "/",
    authMiddleware,
    createShortUrl
);

// Get user's URLs
router.get(
    "/",
    authMiddleware,
    getUserUrls
);

// Get single URL
router.get(
    "/:id",
    authMiddleware,
    getSingleUrl
);

// Update URL
router.patch(
    "/:id",
    authMiddleware,
    updateUrl
);

// Delete URL
router.delete(
    "/:id",
    authMiddleware,
    deleteUrl
);

export default router;