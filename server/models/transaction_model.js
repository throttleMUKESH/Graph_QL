import mongoose from "mongoose";

const transactioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: [true, "description must required"]
    },
    paymentType: {
        type: String,
        required: [true, "paymentType must required"]
    },
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        required: true
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    location : {
        type: String,
        default: "Unkown"
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, {timestamps: true})

const Transaction = mongoose.model("Transaction", transactioSchema);

export default Transaction