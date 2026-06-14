const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");

const { generateToken } = require("../utils/jwt");

/**
 * Register User
 */
exports.register = async (req, res) => {
  try {
    const { userid, password, name, email, phone } = req.body;

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("userid", userid)
      .single();

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert([
      {
        userid,
        password: hashedPassword,
        name,
        email,
        phone,
      },
    ]);

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Login User
 */
exports.login = async (req, res) => {
  try {
    const { userid, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("userid", userid)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        userid: user.userid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
