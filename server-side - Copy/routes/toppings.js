const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.get("/", function (req, res) {
   let mySql = "SELECT * FROM pizza_galaxy.topping";
   conn.query(mySql, (err, results, fields) => {
      if (err) throw err;
      res.status(200).json({
         results: results,
      });
   });
});

router.get("/:toppingId", function (req, res) {
   const toppingId = req.params.toppingId;
   let sql = `Select * from pizza_galaxy.topping WHERE id = ${toppingId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.delete("/:toppingId", function (req, res) {
   const toppingId = req.params.toppingId;
   let sql = `DELETE from pizza_galaxy.topping WHERE id = ${toppingId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.post("/", function (req, res) {
   let data = {
      name: req.body.name,
      topping_type_id: req.body.typeId,
   };
   let toppingSql = "INSERT INTO pizza_galaxy.topping SET ?";
   let query = conn.query(toppingSql, data, (err, results) => {
      if (err) throw err;
      res.status(201).json({
         results,
      });
   });
});

router.put("/:toppingId", function (req, res) {
   const toppingId = req.params.toppingId;
   let toppingSql =
      "UPDATE pizza_galaxy.topping SET name ='" +
      req.body.name +
      "', topping_type_id ='" +
      req.body.typeId +
      "' where id =" +
      toppingId;

   let query = conn.query(toppingSql, (err, results) => {
      if (err) throw err;
      res.status(200).json();
   });
});

module.exports = router;
