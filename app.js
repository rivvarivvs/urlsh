const express = require("express");
const connectDB = require("./config/db");
const shortid = require("shortid");
const validUrl = require("valid-url");

//Routes
const shortUrl = require("./routes/shortUrl");

const app = express();
connectDB();

app.use(express.json({}));

//app.use routes
app.use("/", shortUrl);

app.listen(3000, () => {
  console.log(`Server listening on port 3000!`);
});
