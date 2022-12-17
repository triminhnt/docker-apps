//yarn add express
const express = require('express');
const app = express();
//middleware chuyển đổi data json từ FE xuống express
app.use(express.json());
app.use(express.static(".")); // định nghĩa lại url để sử dụng tài nguyên

const cors = require('cors');
app.use(cors());
//domain
app.listen(8080)

// const mysql = require('mysql2');
// //kết nối CSDL
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "db_node",
//     port: 3306
// })

const rootRoute = require('./routes');

app.use("/api",rootRoute)