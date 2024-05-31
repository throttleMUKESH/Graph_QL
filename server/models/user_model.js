import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    password: {
      type: String,
      required: [true, "password must be required"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User