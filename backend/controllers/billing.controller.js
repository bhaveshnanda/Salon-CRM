const supabase = require("../config/supabase");

exports.getBills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bills")
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

exports.generateBill = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const { data: appointment, error: appError } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (appError) throw appError;

    const subtotal = Number(appointment.price || 0);

    const tax = subtotal * 0.18;

    const discount = 0;

    const total = subtotal + tax - discount;

    const invoiceNo = "INV-" + Math.floor(100000 + Math.random() * 900000);

    const { data, error } = await supabase
      .from("bills")
      .insert([
        {
          appointment_id: appointment.id,

          invoice_no: invoiceNo,

          client_name: appointment.client_name,

          staff_name: appointment.staff_name,

          service_name: appointment.service,

          subtotal,

          tax,

          discount,

          total,

          payment_status: "Pending",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
