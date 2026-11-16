import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("URL router is working!")
});
export default router;