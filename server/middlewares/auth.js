import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    console.log("🦩 ~ Hello from auth");

    const token = req.cookies["volunteer"];
    console.log("🦩 ~ token:", token);

    const decoded = jwt.verify(token, process.env.JWT);
    console.log("🦩 ~ decoded:", decoded);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("🦩 ~ auth error", error.message);

    res.send({ success: false, error: error.message });
  }
}
