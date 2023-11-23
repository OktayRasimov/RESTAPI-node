const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Route Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Route Getting 1
router.get("/:id", (req, res) => {
  const param = req.params.id;
  res.send(`Get hello sub ${param}`);
});
//Route Creating 1
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribeToChannel: req.body.subscribeToChannel,
  });
  try {
    const newSubsciber = await subscriber.save();
    res.status(201).send(newSubsciber);
  } catch (err) {
    console.log(`Couldnot Create Subscriber:${err}`);
  }
});
//Route Update 1
router.patch("/:id", (req, res) => {
  req.params.id;
});
//Route Delete 1
router.patch("/:id", (req, res) => {
  req.params.id;
});

module.exports = router;
