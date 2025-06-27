import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mySecret123";

class AuthService {
  async register({ email, username, password }) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use");

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hash });
    await user.save();
    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    return { token, user };
  }
}

export default new AuthService();
