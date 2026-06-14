const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

router.get("/", protect, getClients);

router.get("/:id", protect, getClientById);

router.post("/", protect, createClient);

router.put("/:id", protect, updateClient);

router.delete("/:id", protect, deleteClient);

module.exports = router;
