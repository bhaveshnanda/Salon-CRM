const supabase = require("../config/supabase");

exports.getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", {
        ascending: true,
      });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const {
      client_name,
      phone,
      staff_name,
      service,
      price,
      appointment_date,
      appointment_time,
      notes,
    } = req.body;

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          client_name,
          phone,
          staff_name,
          service,
          price,
          appointment_date,
          appointment_time,
          notes,
          status: "Booked",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const {
      client_name,
      phone,
      staff_name,
      service,
      price,
      appointment_date,
      appointment_time,
      notes,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("appointments")
      .update({
        client_name,
        phone,
        staff_name,
        service,
        price,
        appointment_date,
        appointment_time,
        notes,
        status,
      })
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { appointment_date, appointment_time } = req.body;

    const { data, error } = await supabase
      .from("appointments")
      .update({
        appointment_date,
        appointment_time,
        status: "Rescheduled",
      })
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .update({
        status: "Cancelled",
      })
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
