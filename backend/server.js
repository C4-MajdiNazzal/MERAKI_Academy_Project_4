const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/db");

const app = express();
const PORT = 5000;

// Import Routers
const questionsRouter = require("./routes/questions");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const rolesRouter = require("./routes/roles");
const answersRouter = require("./routes/answers");

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/questions", questionsRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/login", loginRouter);
app.use("/answers", answersRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
