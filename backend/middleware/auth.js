import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log("Auth middleware - Checking token...");

    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token found in Authorization header");
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token found, verifying...");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    req.user = decoded;
    console.log("Auth middleware - Calling next()");
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};

export default auth;
