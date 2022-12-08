const jwt = require("jsonwebtoken");

module.exports.authenticateUser = (req, res, next) => {
  if (!req.headers.accesstoken) {
    return res.status(400).send({ msg: "Token Not Found" });
  }
  try {
    const userData = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY);
    req.body.currentUser = userData;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Unauthorised" });
  }
};

module.exports.authorisedUser = (req, res, next) => {
  console.log(req.body.currentUser.role);
  if (req.body.currentUser.role === "admin") {
    next();
  } else {
    return res
      .status(400)
      .send({ msg: "Forbidden : No Permission To Access " });
  }
};
