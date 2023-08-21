const express = require("express");
const router = express.Router();

const {
  validateNEWbody,
  validatePUTbody,
  Aamati,
} = require("../models/Aamati");

//Routknowledge

/**
 * @desc get all Authors
 * @route aamati/
 * @method GET
 * @access public
 **/
router.get("/", async (req, res) => {
  try {
    const imamList = await Aamati.find().populate("author","name username");

    if (imamList.length > 0) {
      res.status(200).json(imamList);
    } else {
      res.status(404).json({ message: "No imam found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
});

/**
 * @desc get item by id
 * @route /find/:id
 * @method GET
 * @access public
 **/
router.get("/find/:id", async (req, res) => {
  const imam = await Aamati.findById(req.params.id);
  if (imam) {
    res.status(200).json(imam);
  } else {
    res.status(404).json("not found the imam");
  }
});

/**
 * @desc Add New item
 * @route /new
 * @method POST
 * @access public
 **/
router.post("/new", async (req, res) => {
  validateNEWbody(req.body);
  if (error) {
    res.status(401).send(error.details[0].message);
  } else {
    const imam = await new Aamati({
      name: req.body.name,
      age: req.body.age,
      title: req.body.title,
      author: req.body.author,
    });
    const result = await imam.save();
    res.status(201).json(result); // 201 for the create item successfully
  }
});

/**
 * @desc PUT item
 * @route /edit
 * @method PUT
 * @access public
 **/
router.put("/edit/:id", async (req, res) => {
  const find = await Aamati.findById(req.params.id);
  validatePUTbody(req.body);
  if (find) {
    if (error) {
      res.status(404).send(error.details[0].message);
    } else {
      const updateImam = await Aamati.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            title: req.body.title,
            age: req.body.age,
          },
        },
        { new: true }
      );
      res.status(200).json(updateImam); // 200 for the update item successfully
    }
  } else {
    res.status(404).send("the item not found");
  }
});

/**
 * @desc  DELETE item
 * @route /del
 * @method DELETE
 * @access public
 **/
router.delete("/del/:id", async (req, res) => {
  const idItem = req.params.id;
  const find = await Aamati.findById(idItem);
  if (find) {
    await Aamati.findByIdAndDelete(idItem);
    res.status(200).json("delete your acount sucesfly");
  } else {
    res.status(400).send("this item not foundo");
  }
});

module.exports = router;
