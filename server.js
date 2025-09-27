const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A23126511201",
  database: "foodapp"
});

db.connect(err => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to MySQL");
});

// ==================
// GET FOOD ITEMS
// ==================
app.use((err, req, res, next) => {
  res.set("Cache-control","no-store");
    console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
app.get("/food-items", (req, res) => {
  db.query("SELECT * FROM food_items", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json( results );
  });
});

// ==================
// SIGN UP (plain password)
// ==================
app.post("/signup", (req, res) => {
  console.log(req.body)
    const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
        console.log(err,`hi`)
      if (err) return res.status(400).json({ error: "User already exists" });
      res.json({ message: "User registered successfully", userId: result.insertId });
    }
  );
});

// ==================
// LOGIN (plain password)
// ==================
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running!" });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(400).json({ error: "Invalid username or password" });

    res.json({ message: "Login successful", user: { id: results[0].id, username: results[0].username } });
  });
});

// ==================
// Start Server
// ==================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
