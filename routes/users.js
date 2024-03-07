const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
/* GET users listing. */
router.get("/", userController.getUsers);

// GET request for creating a test user
router.get("/createuser", userController.createUser_get);
router.post("/createuser", userController.createUser_post);

// GET request for one user
router.get("/:id", userController.getUser);

module.exports = router;
