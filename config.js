import mongoose from "mongoose";

const url = "mongodb://localhost:27017/chatApp"; // Corrected URL

export const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("DB Is Connected");
    } catch (error) {
        console.error("DB Connection Error: ", error);
    }
};
