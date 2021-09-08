import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  images: {
    profileImage: String,
    firstVerificationImage: String,
    secondVerificationImage: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: Number,
  },
  birthDate: { type: Date, required: true },
  identityCard: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8,
  },
  sexe: { type: String, enum: ["male", "female"], required: true },
  verified: { type: Boolean, required: true, default: false },
  type: {
    type: String,
    enum: ["client", "admin", "agent", "deliveryAgent"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
