const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getBills,
  getBillById,
  generateBill,
} = require("../controllers/billing.controller");

router.get("/", protect, getBills);

router.get("/:id", protect, getBillById);

router.post("/generate/:id", protect, generateBill);

module.exports = router;
