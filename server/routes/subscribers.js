const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");
const subscriber = require("../models/subscriber");

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
router.get("/:id", getSubscriber, (req, res) => {
  res.status(200).send(res.subscriber.name);
});
//Route Creating 1
router.post("/", getSubscriber, async (req, res) => {
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
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribeToChannel != null) {
    res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.send(updatedSubscriber);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
//Route Delete 1
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne();
    res.status(200).send({ message: "Succesfully deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ message: `Something went wrong with deleting:${err.message}` });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).send({ message: "Cannot find Subscriber" });
    }
  } catch (err) {
    console.error(`Something went wrong:${err}`);
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
