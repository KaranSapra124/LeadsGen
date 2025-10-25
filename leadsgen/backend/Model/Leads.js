import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Lead name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        status: {
            type: String,
            default: "new",
        },
        aiMessage: {
            type: String,
            default: "",
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
);

// Prevent model overwrite issues in Next.js (hot reload)
const Leads = mongoose.model("Lead", LeadSchema);
export default Leads
