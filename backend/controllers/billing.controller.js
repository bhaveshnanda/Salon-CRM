const supabase = require("../config/supabase");

exports.generateBill = async (req, res) => {
  try {
    const { appointment_id, subtotal, tax, discount } = req.body;

    const total = Number(subtotal) + Number(tax) - Number(discount);

    const { data, error } = await supabase

      .from("bills")

      .insert([
        {
          appointment_id,
          subtotal,
          tax,
          discount,
          total,
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

exports.deleteBill = async (req, res) => {
  try {
    const { error } = await supabase

      .from("bills")

      .delete()

      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Bill deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
