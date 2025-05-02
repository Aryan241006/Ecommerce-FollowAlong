const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.authToken; // Get token from cookie

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
//     req.user = decoded; // Attach decoded user data (email, id) to request
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
//   }
// };

// module.exports = authenticateToken;
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log("Cookies received:", req.cookies); // Debug log
  if (!token) {
    console.log("No token provided for request:", req.url);
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
module.exports = authenticateToken;