import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
    {
        url: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Url",
            required: true,
            index: true
        },

        ipAddress: {
            type: String,
            default: null
        },

        userAgent: {
            type: String,
            default: null
        },

        browser: {
            type: String,
            default: "Unknown"
        },

        device: {
            type: String,
            default: "Unknown"
        },

        os: {
            type: String,
            default: "Unknown"
        },

        referrer: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Click = mongoose.model("Click", clickSchema);

export default Click;