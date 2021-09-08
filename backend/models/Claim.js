import mongoose from "mongoose";

const claimSchema = mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, maxlength: 200, required: true },
  date: { type: Date, required: true, default: Date.now() },
  about: {
    type: String,
    enum: ["general", "product", "client"],
  },
  state: {
    type: String,
    enum: ["resolved", "notresolved"],
    default: "notresolved",
  },
});

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;
