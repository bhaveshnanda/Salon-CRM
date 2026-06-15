const supabase = require("../config/supabase");

exports.getCalendarSchedule = async (req, res) => {
  try {
    const { data: staff } = await supabase
      .from("staff")
      .select("*")
      .eq("status", "Active");

    const { data: appointments } = await supabase
      .from("appointments")
      .select("*");

    res.json({
      staff,
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
