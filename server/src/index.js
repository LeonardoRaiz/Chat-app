const express = require("express");
const cors = require("cors");
require("reflect-metadata");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());

app.use("/api/auth", userRoutes);


const { client } = require("./database/database");

const PORT = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    console.log("DB conectado");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(PORT, () => {
  console.log(`Servidor está ativo! na porta ${PORT}`);
});
