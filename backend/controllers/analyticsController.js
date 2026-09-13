import Url from "../models/Url.js";
import Click from "../models/Click.js";

export const getUrlAnalytics = async (req, res) => {
    try {
        const { urlId } = req.params;

        // 1. Check that URL belongs to logged-in user
        const url = await Url.findOne({
            _id: urlId,
            owner: req.user.userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        // 2. Get all clicks
        const clicks = await Click.find({
            url: url._id
        }).sort({
            createdAt: -1
        });

        // 3. Total clicks
        const totalClicks = clicks.length;

        // 4. Clicks by day
        const clicksByDay = {};

        clicks.forEach((click) => {
            const date = click.createdAt
                .toISOString()
                .split("T")[0];

            clicksByDay[date] =
                (clicksByDay[date] || 0) + 1;
        });

        // 5. Referrers
        const referrerCounts = {};

        clicks.forEach((click) => {
            const referrer = click.referrer || "Direct";

            referrerCounts[referrer] =
                (referrerCounts[referrer] || 0) + 1;
        });

        // 6. Recent clicks
        const recentClicks = clicks.slice(0, 10);

        return res.status(200).json({
            url: {
                id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl:
                    `${req.protocol}://${req.get("host")}/${url.shortCode}`,
                isActive: url.isActive,
                expiresAt: url.expiresAt
            },

            analytics: {
                totalClicks,
                clicksByDay,
                referrerCounts,
                recentClicks
            }
        });

    } catch (error) {
        console.error(
            "Analytics error:",
            error.message
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};