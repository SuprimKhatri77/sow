import Router from "express";
import { db } from "../db/index.js";
import { languages } from "../db/schema.js";

const router = Router();

router.get("/languages", async (req, res) => {
  try {
    const allLanguages = await db.select().from(languages);
    res.json(allLanguages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Failed to fetch languages" });
  }
});

export default router;
