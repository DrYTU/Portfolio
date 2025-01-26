const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(req);
    
    // Token var mı kontrolü
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        console.log(token);
        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
