const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "din_jwt_hemlighet";

exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Ingen token tillhandahållen" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Ogiltig token" });
    req.user = user;
    next();
  });
};
