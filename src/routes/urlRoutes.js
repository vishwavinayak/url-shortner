import express from "express";
const router = express.Router();

// GET request
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "GET request received sucessfully"
  });
});

// POST request
router.post("/test", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(201).json({
    message: "POST request received sucessfully",
    receivedData: data
  })
});
export default router;
