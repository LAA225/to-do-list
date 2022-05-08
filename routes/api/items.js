const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require("../../models/items");

// @route  GET api/items
// @desc   get all items
// @access public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: 1 })
    .then((items) => {
      res.json(items);
    });
});

// @route  POST api/items
// @desc   create a item
// @access private

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => {
      res.json(item).json({ msg: "item suucessfully created" });
    })
    .catch((err) => {
      res.status(400);
    });
});

// @route  DELETE api/items
// @desc   delete a item
// @access private

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.remove().then(() => {
        res.json({ msg: "item successfully deleted" });
      });
    })
    .catch((err) => res.status(400));
});

module.exports = router;
