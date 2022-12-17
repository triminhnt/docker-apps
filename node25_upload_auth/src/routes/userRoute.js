//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const userRoute = express.Router();
const { getUser, createUser, updateUser, uploadUser, signUp, login } = require('../controllers/userController');
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

// upload base64
userRoute.post("/upload_base", upload.single("dataUpload"), uploadUser)

// POST:  localhost:8080/api/user/upload => upload: file
//POST upload
userRoute.post("/upload", upload.single("dataUpload"), (req, res) => {
    console.log(req.file)// lưu database 
    // lưu req.file.filename => 1668603055532_download.jpeg
    // response.send() => domain/public/img/1668603055532_download.jpeg
})

//GET user
userRoute.get("/getUser", verifyToken, getUser);

//POST create user
userRoute.post("/createUser",verifyToken, createUser);

//PUT update user
userRoute.put("/updateUser/:user_id",verifyToken, updateUser);


//Signup
userRoute.post("/signUp", signUp);

//login
userRoute.get("/login", login);

module.exports = userRoute;
