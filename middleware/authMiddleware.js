const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            message: "No Token, Access Denied"
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, 'mysecretkey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;