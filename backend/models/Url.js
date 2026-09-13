import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        customAlias: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        clicks: {
            type: Number,
            default: 0,
        },

        expiresAt: {
            type: Date,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        healthStatus: {
            type: String,
            enum: ["unknown", "healthy", "broken"],
            default: "unknown",
        },
    },
    {
        timestamps: true,
    }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;