function auth(req, res, next) { 
    if (req.user?.id) return next()

    return res.status(401).json({ message: "Unauthorized" });
}

module.exports = auth;