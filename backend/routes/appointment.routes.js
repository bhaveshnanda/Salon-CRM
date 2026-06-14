const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  rescheduleAppointment,
  cancelAppointment,
  deleteAppointment,
} = require("../controllers/appointment.controller");

router.get("/", protect, getAppointments);

router.get("/:id", protect, getAppointmentById);

router.post("/", protect, createAppointment);

router.put("/:id", protect, updateAppointment);

router.put("/reschedule/:id", protect, rescheduleAppointment);

router.put("/cancel/:id", protect, cancelAppointment);

router.delete("/:id", protect, deleteAppointment);

module.exports = router;
