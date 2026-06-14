const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  generateBill,
  getBills,
  getBillById,
  deleteBill,
} = require("../controllers/billing.controller");

router.post("/", protect, generateBill);

router.get("/", protect, getBills);

router.get("/:id", protect, getBillById);

router.delete("/:id", protect, deleteBill);

module.exports = router;
