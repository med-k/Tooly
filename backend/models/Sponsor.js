import mongoose from "mongoose";

const sponsorSchema = mongoose.Schema({
  brand: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  logo: { type: String, require: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  price: { type: Number, require: true, default: 1000 },
  state: {
    type: String,
    enum: ["active", "notactive"],
    default: "active",
  },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
