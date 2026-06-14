require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/staff", require("./routes/staff.routes"));

app.use("/api/clients", require("./routes/client.routes"));

app.use("/api/services", require("./routes/service.routes"));

app.use("/api/appointments", require("./routes/appointment.routes"));

app.use("/api/billing", require("./routes/billing.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
