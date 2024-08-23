const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
//middleware
//cors

app.use(express.json());
const planteRouter = require("./routes/plante");
const authRouter = require("./routes/auth");
const orderRoutes = require("./routes/orders");

app.use("/plante", planteRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
