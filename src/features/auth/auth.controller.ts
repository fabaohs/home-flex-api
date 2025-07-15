export class AuthController {
  login(req, res) {
    return res.status(200).json({
      message: "Login successful",
    });
  }
}
