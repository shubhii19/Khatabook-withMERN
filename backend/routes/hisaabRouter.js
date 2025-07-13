const express = require("express");
const router = express.Router();

const {
  createHisaabController,
  readHisaabController,
  deleteController,
  editHisaabController,
  editPostHisaabController,
  readVerifiedHisaabController,
} = require("../controller/hisaabController.js");

const { isLoggedIn } = require("../middlewares/middleware.js");

// Create a new hisaab
router.post("/", isLoggedIn, createHisaabController);

// Read a hisaab (unauthenticated if public or non-encrypted)
router.get("/:id", isLoggedIn, readHisaabController);

// Verify passcode to read encrypted hisaab
router.post("/verify/:id", isLoggedIn, readVerifiedHisaabController);

// Get hisaab details to edit (optional: can be merged with read)
router.get("/edit/:id", isLoggedIn, editHisaabController);

// Update an existing hisaab
router.put("/:id", isLoggedIn, editPostHisaabController);

// Delete a hisaab
router.delete("/:id", isLoggedIn, deleteController);

module.exports = router;
