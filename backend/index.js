const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/users.route");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to TaskFlow API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
