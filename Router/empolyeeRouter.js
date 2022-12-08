const express = require("express");
const router = express.Router();
const empolyeeModule = require("../Module/empolyeeModule");
const authModule = require("../Module/authModule");

router.get("/get", empolyeeModule.getEmployee);
router.post(
  "/create",
  /* authModule.authorisedUser, */
  empolyeeModule.createEmployee
);
router.put(
  "/update/:id",
  authModule.authorisedUser,
  empolyeeModule.updateEmployee
);
router.delete(
  "/delete/:id",
  authModule.authorisedUser,
  empolyeeModule.deleteEmployee
);

module.exports = router;
