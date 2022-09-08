const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());

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
