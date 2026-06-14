const supabase = require("../config/supabase");

exports.getClients = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("clients")
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

exports.getClientById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("clients")
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

exports.createClient = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          name,
          phone,
          email,
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

exports.updateClient = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const { data, error } = await supabase
      .from("clients")
      .update({
        name,
        phone,
        email,
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

exports.deleteClient = async (req, res) => {
  try {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Client deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
