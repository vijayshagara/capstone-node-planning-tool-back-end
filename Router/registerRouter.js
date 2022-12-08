const express = require("express");
const router = express.Router();
const registerModule = require("../Module/registerModule");

router.post("/signup", registerModule.signUp);
router.post("/login", registerModule.logIn);

module.exports = router;
