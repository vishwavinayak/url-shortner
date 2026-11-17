import express from "express";

import urlRoutes from "./routes/urlRoutes.js";
import { getOriginalUrl } from "./services/urlService.js";
const app = express();
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next()
};

const PORT = 3000;


app.use(express.json());
app.use(express.static("public"));
app.use("/api", urlRoutes);
app.use(requestLogger);

// app.get("/", (req, res) => {
//   res.send("Welcome to urlshortner!");
// });

app.get("/:shortCode", (req,res)=> {
  const shortCode = req.params.shortCode;
  const originalUrl = getOriginalUrl(shortCode);
  if(!originalUrl) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(originalUrl);
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

