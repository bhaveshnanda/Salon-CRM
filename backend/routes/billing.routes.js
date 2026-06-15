const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getBills,
  getBillById,
  generateBill,
  markAsPaid,
} = require("../controllers/billing.controller");

router.get("/", protect, getBills);
router.get("/:id", protect, getBillById);
router.post("/generate/:id", protect, generateBill);
router.put("/pay/:id", protect, markAsPaid);

module.exports = router;
