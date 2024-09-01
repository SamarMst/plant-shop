const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const authHeader = authorization.split(" ");

  if (authHeader[0] === "Bearer" && authHeader[1]) {
    try {
      const { ACCESS_TOKEN_SECRET } = process.env;
      const decoded = await jwt.verify(authHeader[1], ACCESS_TOKEN_SECRET);
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token is invalid" });
      } else {
        return res.status(401).json({ message: "User is not authenticated" });
      }
    }
  } else if (!authHeader[0] || authHeader[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Authorization header must start with Bearer" });
  } else {
    return res.status(401).json({ message: "Token is missing" });
  }
};

module.exports = authenticateToken;
