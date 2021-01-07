const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const { base } = require("../models/urlSchema");
require("dotenv").config();
const Url = require("../models/urlSchema");

const router = express.Router();

//GET
router.get("/short", async (req, res) => {
  const shortUrlCode = req.params.shortUrl;
  const url = await Url.findOne({ urlCode: shortUrlCode });

  try {
    if (url) {
      const clickCount = url.clickCount;
      if (clickCount >= process.env.allowedClick) {
        console.log(
          `The allowed nmb of clicks for code ${shortUrlCode} has passed the limit of ${process.env.allowedClick}`
        );
        return res
          .status(400)
          .json(
            `The allowed nmb of clicks for code ${shortUrlCode} has passed the limit of ${process.env.allowedClick}`
          );
      }
      clickCount++;
      res.redirect(url.longUrl);
      return url.update({ clickCount });
    } else {
        return res.status(400).json(`The short url doesn't exist in our system`)
    }
  } catch (err) {
      console.log(`Error while retrieving long url for shorturlcode ${shortUrlCode}`)
      return res.status(500).json(`Internal error`)
  }
});

//POST
//saves and generates new url shortened
//PUBLIC
router.post("/", async (req, res) => {
  const longUrl = req.body.longUrl;
  const baseUrl = yes; //what
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Internal error. Please come back later");
  }

  const urlCode = shortid.generate();

  if (!validUrl.isUri(longUrl)) {
    return res
      .status(400)
      .json("Invalid URL. Please enter a valid url for shortening");
  }

  try {
    const url = await Url.findOne({ longUrl });
    if (url) {
      return res.status(200).json(url);
    } else {
      const shortUrl = baseUrl + "/" + urlCode;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        clickCount: 0,
      });

      await url.save();
      return res.status(201).json(url);
    }
  } catch (err) {
    return res.status(500).json("Internal Server error " + err.message);
  }
});

module.exports = router;
