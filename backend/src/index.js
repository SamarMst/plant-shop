const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
//middleware
//cors

app.use(express.json());
const planteRouter = require("./routes/plante");
const authRouter = require("./routes/auth");

app.use("/plante", planteRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
