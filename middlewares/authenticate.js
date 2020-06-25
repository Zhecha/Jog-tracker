const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let token =
    req.headers["x-access-token"] || req.headers["authorization"] || "";
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, "NJBKJBK34853456HVJHV");

    if (!decoded) {
      return res.status(401).send(decoded);
    }

    req.token = token;
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = {
  authenticate,
};
