import mongoose from "mongoose";

export const Todo = mongoose.model("Todo", {
    username: String,
    text: String,
});
