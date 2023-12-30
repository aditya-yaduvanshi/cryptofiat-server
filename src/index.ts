import express from "express";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;

const app = express();

// index route and also to health check
app.get("/", (_req, res) => {
  res.send("Hello From CryptoFiat server!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
