import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Anonymous",
    unique: true,
  },
  email: {
    type: String,
    default: "",
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});


const User = mongoose.model("User", userSchema);

export default User;
