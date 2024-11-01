require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const postRoutes = require("./routes/postRoutes");
app.use("/api", postRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Domain-service körs på port ${PORT}`);
});
