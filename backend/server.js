const express = require("express");
const app = express();
const port = 8000;

const authRoutes = require("./routes/auth");

// Middleware to parse JSON bodies
app.use(express.json());

//api auth routes
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
