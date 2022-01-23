import express from "express";
import rp from "request-promise";
import dotenv from "dotenv";
import path from "path";
const router = express.Router();

dotenv.config({ path: path.join(__dirname, "../", ".env") });

router.get("/auth", async (req, res) => {
  const options = {
    method: "POST",
    url: "https://zoom.us/oauth/token",
    qs: {
      grant_type: "authorization_code",

      code: req.query.code,

      redirect_uri: "http://localhost:8000/auth",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64"),
    },
  };

  try {
    let response = await rp(options);
    // TODO: set default auth header here and res.redirect to /me endpoint
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/me", (req, res) => {});

export default router;
