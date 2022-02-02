import express from "express";
const cors = require("cors");

const app = express();
app.use(cors());
require("dotenv").config();

require("./server/config/mongoose.config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./server/routes/authRoutes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening at Port 8000");
});

//Error handler
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: "not found",
  });
});
