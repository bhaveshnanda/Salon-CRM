const supabase = require("../config/supabase");

exports.getDashboardStats = async (req, res) => {
  try {
    const { count: clients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    const { count: staff } = await supabase
      .from("staff")
      .select("*", { count: "exact", head: true });

    const { count: appointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true });

    const today = new Date().toISOString().split("T")[0];

    const { count: todaysAppointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("appointment_date", today);

    const { data: bills } = await supabase
      .from("bills")
      .select("total,payment_status");

    const totalRevenue =
      bills?.reduce((sum, item) => sum + Number(item.total || 0), 0) || 0;

    const pendingPayments =
      bills?.filter((item) => item.payment_status === "Pending").length || 0;

    res.json({
      clients,
      staff,
      appointments,
      todaysAppointments,
      totalRevenue,
      pendingPayments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
