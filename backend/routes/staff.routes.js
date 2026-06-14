const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staff.controller");

router.get("/", protect, getStaff);

router.get("/:id", protect, getStaffById);

router.post("/", protect, createStaff);

router.put("/:id", protect, updateStaff);

router.delete("/:id", protect, deleteStaff);

module.exports = router;
