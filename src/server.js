import express from "express";

import urlRoutes from "./routes/urlRoutes.js";
const app = express();

const PORT = 3000;


app.use(express.json());

app.use("/api", urlRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to urlshortner!");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next()
};
app.use(requestLogger); 