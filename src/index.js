const express = require("express");

const app = express();
app.use(express.json());

const planteRouter = require("./routes/plante");

app.use("/plante", planteRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// add call back to console log localhost and port
/**
 * make port dynamic from a var (const) also make it in env
 */
