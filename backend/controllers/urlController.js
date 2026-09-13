import Url from "../models/Url.js";
import generateShortCode from "../utils/generateShortCode.js";
import validateUrl from "../utils/validateUrl.js";
import Click from "../models/Click.js";
import { UAParser } from "ua-parser-js";
// CREATE SHORT URL
export const createShortUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;

        // 1. Validate original URL
        if (!originalUrl) {
            return res.status(400).json({
                message: "Original URL is required"
            });
        }

        if (!validateUrl(originalUrl)) {
            return res.status(400).json({
                message: "Please provide a valid HTTP or HTTPS URL"
            });
        }

        // 2. Validate expiration date
        let expirationDate = null;

        if (expiresAt) {
            expirationDate = new Date(expiresAt);

            if (isNaN(expirationDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid expiration date"
                });
            }

            if (expirationDate <= new Date()) {
                return res.status(400).json({
                    message: "Expiration date must be in the future"
                });
            }
        }

        let shortCode;

        // ==========================================
        // 3. CUSTOM ALIAS
        // ==========================================

        if (customAlias) {

            // Allow only letters, numbers, hyphens and underscores
            const aliasRegex = /^[A-Za-z0-9_-]+$/;

            if (!aliasRegex.test(customAlias)) {
                return res.status(400).json({
                    message:
                        "Custom alias can only contain letters, numbers, hyphens and underscores"
                });
            }

            // Optional length restriction
            if (customAlias.length < 3 || customAlias.length > 30) {
                return res.status(400).json({
                    message: "Custom alias must be between 3 and 30 characters"
                });
            }

            // Check if the alias is already being used
            // either as a custom alias OR as a generated shortCode
            const existingUrl = await Url.findOne({
                $or: [
                    { customAlias: customAlias },
                    { shortCode: customAlias }
                ]
            });

            if (existingUrl) {
                return res.status(409).json({
                    message: "This custom alias is already in use"
                });
            }

            shortCode = customAlias;

        } else {

            // ==========================================
            // 4. GENERATE RANDOM SHORT CODE
            // ==========================================

            let existingUrl;

            do {
                shortCode = generateShortCode();

                existingUrl = await Url.findOne({
                    shortCode
                });

            } while (existingUrl);
        }

        // ==========================================
        // 5. CREATE URL
        // ==========================================

        const urlData = {
            originalUrl,
            shortCode,
            owner: req.user.userId
        };

        // Add customAlias only when provided
        if (customAlias) {
            urlData.customAlias = customAlias;
        }

        // Add expiration only when provided
        if (expirationDate) {
            urlData.expiresAt = expirationDate;
        }

        const url = await Url.create(urlData);

        // ==========================================
        // 6. CREATE SHORT URL
        // ==========================================

        const shortUrl =
            `${req.protocol}://${req.get("host")}/${shortCode}`;

        // ==========================================
        // 7. SEND RESPONSE
        // ==========================================

        return res.status(201).json({
            message: "URL shortened successfully",

            url: {
                id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl,
                customAlias: url.customAlias || null,
                expiresAt: url.expiresAt,
                isActive: url.isActive,
                clicks: url.clicks
            }
        });

    } catch (error) {
        console.error("Create URL error:", error.message);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Short code or custom alias already exists"
            });
        }

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// REDIRECT SHORT URL
// ==========================================

export const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // 1. Find URL
        const url = await Url.findOne({
            shortCode
        });

        // 2. URL doesn't exist
        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        // 3. URL is disabled
        if (!url.isActive) {
            return res.status(410).json({
                message: "This link has been disabled"
            });
        }

        // 4. URL has expired
        if (url.expiresAt && new Date() >= url.expiresAt) {
            return res.status(410).json({
                message: "This link has expired"
            });
        }

        // ==========================================
        // 5. GET REQUEST INFORMATION
        // ==========================================

        const ipAddress =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.socket.remoteAddress ||
            null;

        const userAgent =
            req.headers["user-agent"] || null;

        const referrer =
            req.headers["referer"] ||
            req.headers["referrer"] ||
            null;
// details of OS deitails of OS device and browser

        const parser = new UAParser(userAgent);

        const browser =
            parser.getBrowser().name || "Unknown";

        const os =
            parser.getOS().name || "Unknown";

        const deviceType =
            parser.getDevice().type;

        const device =
            deviceType || "Desktop";


        await Click.create({
            url: url._id,
            ipAddress,
            userAgent,
            browser,
            device,
            os,
            referrer
        });

        // ==========================================
        // 8. INCREMENT CLICK COUNTER
        // ==========================================

        await Url.findByIdAndUpdate(
            url._id,
            {
                $inc: {
                    clicks: 1
                }
            }
        );

        // ==========================================
        // 9. REDIRECT
        // ==========================================

        return res.redirect(
            302,
            url.originalUrl
        );

    } catch (error) {
        console.error(
            "Redirect error:",
            error.message
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};
export const getUserUrls = async (req, res) => {
    try {
        const urls = await Url.find({
            owner: req.user.userId
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            count: urls.length,
            urls
        });

    } catch (error) {
        console.error("Get URLs error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const getSingleUrl = async (req, res) => {
    try {
        const { id } = req.params;

        // Find URL belonging to logged-in user
        const url = await Url.findOne({
            _id: id,
            owner: req.user.userId
        });

        // URL not found or doesn't belong to user
        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        return res.status(200).json({
            url
        });

    } catch (error) {
        console.error("Get single URL error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const updateUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { originalUrl, expiresAt, isActive } = req.body;

        // Find URL belonging to logged-in user
        const url = await Url.findOne({
            _id: id,
            owner: req.user.userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }
        if (originalUrl !== undefined) {

            if (!validateUrl(originalUrl)) {
                return res.status(400).json({
                    message: "Please provide a valid HTTP or HTTPS URL"
                });
            }

            url.originalUrl = originalUrl;
        }
        if (expiresAt !== undefined) {

            // null means remove expiration
            if (expiresAt === null) {
                url.expiresAt = null;
            } else {

                const expirationDate = new Date(expiresAt);

                if (isNaN(expirationDate.getTime())) {
                    return res.status(400).json({
                        message: "Invalid expiration date"
                    });
                }

                if (expirationDate <= new Date()) {
                    return res.status(400).json({
                        message: "Expiration date must be in the future"
                    });
                }

                url.expiresAt = expirationDate;
            }
        }
        
        if (isActive !== undefined) {

            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    message: "isActive must be a boolean"
                });
            }

            url.isActive = isActive;
        }

        // Save changes
        await url.save();

        return res.status(200).json({
            message: "URL updated successfully",
            url
        });

    } catch (error) {
        console.error("Update URL error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

// dlete API

export const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;

        // Find URL belonging to logged-in user
        const url = await Url.findOne({
            _id: id,
            owner: req.user.userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        // Delete URL
        await Url.findByIdAndDelete(id);

        return res.status(200).json({
            message: "URL deleted successfully"
        });

    } catch (error) {
        console.error("Delete URL error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};