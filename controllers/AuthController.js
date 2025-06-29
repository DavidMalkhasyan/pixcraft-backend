import authService from "../services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { token, user } = await authService.login(req.body);
      res.status(200).json({ message: "Logged in", token, user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
  
  async register(req, res) {
    try {
      const { token, user } = await authService.register(req.body);
      res.status(201).json({ message: "User created", token, user });
    } catch (err) {
      res.status(400).json({ error: err.message });
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
