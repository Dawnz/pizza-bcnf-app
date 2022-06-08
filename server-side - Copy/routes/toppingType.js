const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.get("/", function (req, res) {
   let mySql = "SELECT * FROM pizza_galaxy.topping_type";
   conn.query(mySql, (err, results, fields) => {
      if (err) throw err;
      res.status(200).json({
         results: results,
      });
   });
});

router.get("/:typeId", function (req, res) {
   const typeId = req.params.typeId;
   let sql = `Select * from pizza_galaxy.topping_type WHERE id = ${typeId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.delete("/:typeId", function (req, res) {
   const typeId = req.params.typeId;
   let sql = `DELETE from pizza_galaxy.topping_type WHERE id = ${typeId}`;
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
   };
   let typeSql = "INSERT INTO pizza_galaxy.topping_type SET ?";
   let query = conn.query(typeSql, data, (err, results) => {
      if (err) throw err;
      res.status(201).json({
         results,
      });
   });
});

router.put("/:typeId", function (req, res) {
   const typeId = req.params.typeId;
   let typeSql =
      "UPDATE pizza_galaxy.topping_type SET name ='" +
      req.body.name +
      "' where id =" +
      typeId;

   let query = conn.query(typeSql, (err, results) => {
      if (err) throw err;
      res.status(200).json();
   });
});
module.exports = router;
