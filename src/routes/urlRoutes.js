import express from "express";
import { shortenUrl } from "../services/urlService.js";
const router = express.Router();

// GET request
// router.get("/test", (req, res) => {
//   res.status(200).json({
//     message: "GET request received sucessfully"
//   });
// });

// Create a shortened URL  
router.post("/shorten", (req, res) => {
  const { url } = req.body;
  // Check whether URl provided or not
  if (!url) {
    return res.status(400).json({
      error: "URL is required"
    })
  }
  // validate URL format  
  try {
    const parseUrl = new URL(url);
    if (!["http:", "https:"].includes(parseUrl.protocol)) {
      return res.status(400).json({
        error: "Only HTTP and HTTPS URLs are allowed"
      });
    }
  } catch {
    return res.status(400).json({
      error: "Invalid URL format"
    });
  }
  // Call the service layer

  const shortCode = shortenUrl(url);
  res.status(201).json({
    message: "URL shortened successfully",
    originalUrl: url,
    shortCode: shortCode,
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
  });
  
});  



// POST request
// router.post("/test", (req, res) => {
//   const data = req.body;
//   console.log(data);
//   res.status(201).json({
//     message: "POST request received sucessfully",
//     receivedData: data
//   })
// });
export default router;
