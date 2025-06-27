import authService from "../services/AuthService.js";

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: "User created", user: { email: user.email, username: user.username } });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await authService.login(req.body);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      }).json({ message: "Logged in", user: { email: user.email, username: user.username } });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  async logout(req, res) {
    res.clearCookie("token").json({ message: "Logged out" });
  }

  async profile(req, res) {
    res.json({ message: "Access granted", userId: req.user.userId });
  }
}

export default new AuthController();
