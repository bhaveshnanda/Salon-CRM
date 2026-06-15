const supabase = require("../config/supabase");

exports.getServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, description, duration_minutes, price, status } = req.body;

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          name,
          description,
          duration_minutes,
          price,
          status: status || "Active",
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

exports.updateService = async (req, res) => {
  try {
    const { name, description, duration_minutes, price, status } = req.body;

    const { data, error } = await supabase
      .from("services")
      .update({
        name,
        description,
        duration_minutes,
        price,
        status,
        updated_at: new Date(),
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

exports.deleteService = async (req, res) => {
  try {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
