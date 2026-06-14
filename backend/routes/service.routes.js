const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

router.get("/", protect, getServices);

router.post("/", protect, createService);

router.put("/:id", protect, updateService);

router.delete("/:id", protect, deleteService);

module.exports = router;
