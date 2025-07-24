const express = require("express");
const router = express.Router();

const {
  createHisaabController,
  readHisaabController,
  deleteController,
  editHisaabController,
  editPostHisaabController,
  readVerifiedHisaabController,
  readAllHisaabController,
} = require("../controller/hisaabController.js");

const { isLoggedIn } = require("../middlewares/middleware.js");

// Create a new hisaab
router.post("/create", isLoggedIn, createHisaabController);

// Read a hisaab (unauthenticated if public or non-encrypted)
router.get("/view/:id", isLoggedIn, readHisaabController);

// Verify passcode to read encrypted hisaab
router.post("/verify/:id", isLoggedIn, readVerifiedHisaabController);

// Get hisaab details to edit (optional: can be merged with read)
router.get("/edit/:id", isLoggedIn, editHisaabController);

// Update an existing hisaab
router.put("/:id", isLoggedIn, editPostHisaabController);

// Delete a hisaab
router.delete("/:id", isLoggedIn, deleteController);

// read all hisaab of particular user
router.get("/user/all", isLoggedIn, readAllHisaabController);

module.exports = router;
