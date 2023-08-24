const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      console.log(decode);
      next();
    } catch {
      res.status(401).json({ Message: "invalid token" });
    }
  } else {
    res.status(401).json({ Message: "not found token" });
  }
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id == req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        message: "you are not allowed",
      });
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        message: "you are not Admin",
      });
    }
  });
}
module.exports = {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
