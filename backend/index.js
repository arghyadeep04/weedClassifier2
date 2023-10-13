const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/masterstack')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Connection Error:", err);
  });

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
