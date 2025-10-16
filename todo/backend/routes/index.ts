const express= require("express");
const router = express.Router();

const user= require("./user")
const todos= require("./Todos")
router.use("/user",user)
router.use("/todo",todos)

module.exports =router;