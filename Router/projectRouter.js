const express = require("express");
const router = express.Router();
const projectModule = require("../Module/projectModule");
const authModule = require("../Module/authModule");

router.get("/get", projectModule.getProjects);
router.get("/get/:id", projectModule.getProjectById);
router.post(
  "/create",
  /* authModule.authorisedUser, */
  projectModule.createProjects
);
router.put(
  
  "/update/:id",
  /* authModule.authorisedUser, */
  projectModule.updateProjects
);
router.delete(
  "/delete/:id",
  /* authModule.authorisedUser, */
  projectModule.deleteProjects
);

module.exports = router;