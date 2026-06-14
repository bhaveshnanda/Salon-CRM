const supabase = require("../config/supabase");

exports.getStaff = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("staff")
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

exports.getStaffById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("staff")
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

exports.createStaff = async (req, res) => {
  try {
    const { name, phone, designation } = req.body;

    const { data, error } = await supabase
      .from("staff")
      .insert([
        {
          name,
          phone,
          designation,
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

exports.updateStaff = async (req, res) => {
  try {
    const { name, phone, designation } = req.body;

    const { data, error } = await supabase
      .from("staff")
      .update({
        name,
        phone,
        designation,
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

exports.deleteStaff = async (req, res) => {
  try {
    const { error } = await supabase
      .from("staff")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Staff deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
