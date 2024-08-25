const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authenticateToken = require("./middleware/authenticate");
const planteRouter = require("./routes/plante");
const authRouter = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const categoryRouter = require("./routes/category");
const historyRouter = require("./routes/history");

app.use("/auth", authRouter);

app.use("/plante", planteRouter);
app.use("/orders", authenticateToken, orderRoutes);
app.use("/category", categoryRouter);
app.use("/history", authenticateToken, historyRouter);

app.use(express.static("public/images"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
