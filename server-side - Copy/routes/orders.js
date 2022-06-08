const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.get("/", function (req, res) {
   let mySql =
      "SELECT users.username, topping1.name as topping1,topping2.name as topping2,topping3.name as topping3 FROM pizza_galaxy.orders as orders, pizza_galaxy.user as users, pizza_galaxy.topping as topping1,pizza_galaxy.topping as topping2,pizza_galaxy.topping as topping3 where orders.userId= users.id and orders.topping_id1= topping1.id and orders.topping_id2=topping2.id and orders.topping_id3=topping3.id";
   conn.query(mySql, (err, results, fields) => {
      if (err) throw err;
      res.status(200).json({
         results: results,
      });
   });
});
router.get("/user/:userId", function (req, res) {
   const userId = req.params.userId;
   let mySql = `SELECT topping1.name as topping1,topping2.name as topping2,topping3.name as topping3 FROM pizza_galaxy.orders as orders, pizza_galaxy.topping as topping1,pizza_galaxy.topping as topping2,pizza_galaxy.topping as topping3 where orders.userId= ${userId} and orders.topping_id1= topping1.id and orders.topping_id2=topping2.id and orders.topping_id3=topping3.id`;
   conn.query(mySql, (err, results, fields) => {
      if (err) throw err;
      res.status(200).json({
         results: results,
      });
   });
});

router.get("/:orderId", function (req, res) {
   const orderId = req.params.orderId;
   let sql = `Select * from pizza_galaxy.orders WHERE id = ${orderId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});
router.delete("/:orderId", function (req, res) {
   const orderId = req.params.orderId;
   let sql = `DELETE from pizza_galaxy.orders WHERE id = ${orderId}`;
   let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
         result: result[0],
      });
   });
});

router.post("/", function (req, res) {
   let data = {
      userId: req.body.userId,
      topping_id1: req.body.topping_id1,
      topping_id2: req.body.topping_id2,
      topping_id3: req.body.topping_id3,
   };
   let orderSql = "INSERT INTO pizza_galaxy.orders SET ?";
   let query = conn.query(orderSql, data, (err, results) => {
      if (err) throw err;
      res.status(201).json({
         results,
      });
   });
});

router.put("/:orderId", function (req, res) {
   const orderId = req.params.orderId;
   let orderSql =
      "UPDATE pizza_galaxy.orders SET userId ='" +
      req.body.userId +
      "', topping_id1 ='" +
      req.body.topping_id1 +
      "', topping_id2 ='" +
      req.body.topping_id2 +
      "', topping_id3='" +
      req.body.topping_id3 +
      "' where id =" +
      orderId;

   let query = conn.query(orderSql, (err, results) => {
      if (err) throw err;
      res.status(200).json();
   });
});

module.exports = router;
