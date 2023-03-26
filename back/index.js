const express = require("express");
const userRoutes = require("./routes/userRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
require("dotenv").config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/partner", partnerRoutes);

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
