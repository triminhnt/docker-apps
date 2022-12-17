//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const foodRoute = express.Router();
const {getFood } = require('../controllers/foodController');

//GET food relationship
foodRoute.get("/getFood",getFood)

module.exports = foodRoute;
