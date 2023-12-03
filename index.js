const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const mongoose = require("mongoose");
const URL = require("./models/url");

const app = express();
const PORT = 8001;
mongoose.connect("mongodb+srv://jakkulaharshith18:harshith@cluster0.jcmkzcu.mongodb.net/urls?retryWrites=true&w=majority", {
  useNewUrlParser: true,
}).then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
