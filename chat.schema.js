import mongoose from "mongoose";
export const chatSchema = new mongoose.Schema({
    username: String,
    message: String,
    timeStamp: Date
});
export const chatModel =new mongoose.model("chat",chatSchema);