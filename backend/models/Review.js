import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, maxlength: 200, required: true },
  date: { type: Date, required: true, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
