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
    const { name, price } = req.body;

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          name,
          price,
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
    const { name, price } = req.body;

    const { data, error } = await supabase
      .from("services")
      .update({
        name,
        price,
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
