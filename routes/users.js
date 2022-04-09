import express from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.js";
const router = express.Router();

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//Creating one user
router.post("/", async (req, res) => {
  let { firstName, lastName, age } = req.body;

  //   const newUser = new user(req.body);

  try {
    if (!firstName) {
      res.json({ message: "Please Enter your firstName", status: false });
    } else if (!lastName) {
      res.json({ message: "Please Enter your lastName", status: false });
    } else if (!age) {
      res.json({ message: "Please Enter your age", status: false });
    } else {
      let random = Math.floor(100000 + Math.random() * 900000);
      let userId = "User" + random;
      let user = await User({
        userId,
        firstName,
        lastName,
        age,
      }).save();
      if (!user) {
        res.json({ message: "user not saved", status: false });
      } else {
        res.json({ message: "user saved successfully", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
});
//Get one user
router.get("/:id", getuser, async (req, res) => {
  try {
    await res.send(res.userone);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//Delete one user
router.delete("/:id", getuser, async (req, res) => {
  try {
    await res.userone.remove();
    return res.send("Deleted successfully");
  } catch (error) {
    return res.json({ message: error.message });
  }
});
//Update one user
router.patch("/:id", getuser, async (req, res) => {
  if (req.body.firstName) res.userone.firstName = req.body.firstName;

  if (req.body.lastName) res.userone.lastName = req.body.lastName;

  if (req.body.age) res.userone.age = req.body.age;

  try {
    await res.userone.save();
    return res.send("Updated Sucessfully");
  } catch (error) {
    return res.json({ message: error.message });
  }
});
//get one
async function getuser(req, res, next) {
  let userid = req.params.id;
  let userone;
  try {
    userone = await User.findOne({ userId: userid });
    if (!userone) res.send("Cannot find that user... Please Enter Valid Id");
    // else res.send(userone);
  } catch (error) {
    res.json({ message: error.message });
  }
  res.userone = userone;
  next();
}
uuidv4();
export default router;
