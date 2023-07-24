const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongoURI-needed", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user." });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (password === user.password) {
      return res.status(200).json({ message: "Login successful." });
    } else {
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
