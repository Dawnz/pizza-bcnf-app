const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.get("/", function (req, res) {
   let mySql = "SELECT * FROM pizza_galaxy.user";
   conn.query(mySql, (err, results, fields) => {
      if (err) throw err;
      res.status(200).json({
         results: results,
      });
   });
});
router.get("/:userId", function (req, res) {
   const userId = req.params.userId;
   let sql = `Select * from pizza_galaxy.user WHERE id = ${userId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.delete("/:userId", function (req, res) {
   const userId = req.params.userId;
   let sql = `DELETE from pizza_galaxy.user WHERE id = ${userId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.post("/", function (req, res) {
   let data = {
      username: req.body.username,
      password: req.body.password,
   };
   let userSql = "INSERT INTO pizza_galaxy.user SET ?";
   let query = conn.query(userSql, data, (err, results) => {
      if (err) throw err;
      res.status(201).json({
         results,
      });
   });
});

router.put("/:userId", function (req, res) {
   const userId = req.params.userId;
   let userSql =
      "UPDATE pizza_galaxy.user SET username ='" +
      req.body.username +
      "', password ='" +
      req.body.password +
      "' where id =" +
      userId;

   let query = conn.query(userSql, (err, results) => {
      if (err) throw err;
      res.status(200).json();
   });
});

module.exports = router;
