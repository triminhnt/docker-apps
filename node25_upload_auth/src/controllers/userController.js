// const User = require('../models/user');
// const Food = require('../models/food');
// const Food_Type = require('../models/food_type');
const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const { parseToken } = require('../middlewares/baseToken');

// các hàm xử lý chức năng ở BE chứa trong thư mục controllers

//R => GET
const getUser = async (req, res) => {
    try {
        let data = await model.user.findAll();
        // res.status(200).send(data);
        sucessCode(res, data, "Lấy dữ liệu thành cộng")
    } catch (err) {
        // res.status(500).send("Lỗi Back end");
        errorCode(res, "Lỗi Backend")
    }

}
//C => POST
const createUser = async (req, res) => {
    try {
        let { full_name, email, passWord } = req.body;

        // C1 : trả về danh sách => []
        // .filter()
        let checkEmail = await model.user.findAll({
            where: {
                email
            }
        })
        //C2 : trả về object => {}
        //. find()
        let checkEmailObj = await User.findOne({
            where: {
                email
            }
        });

        // if(checkEmail.length > 0){
        if (checkEmailObj) {
            // res.status(400).send("Email đã tồn tại");
            failCode(res, { full_name, email, passWord }, "Email đã tồn tại !")
        } else {
            let result = await model.user.create({
                full_name,
                email,
                passWord
            });

            // res.status(200).send(result);
            sucessCode(res, result, "Tạo mới thành công !")
        }

    } catch (err) {
        // res.status(500).send("Lỗi Backend");
        errorCode(res, "Lỗi Backend")
    }

}
//U => PUT
const updateUser = async (req, res) => {
    try {
        let { user_id } = req.params;
        let { full_name, email, passWord } = req.body;

        let checkUser = await model.user.findOne({
            where: {
                user_id
            }
        });

        // if(checkEmail.length > 0){
        if (checkUser) {
            await User.update({
                full_name,
                email,
                passWord
            }, {
                where: {
                    user_id
                }
            });

            // res.status(200).send("Update thành công !");
            sucessCode(res, checkUser, "Update thành công");
        } else {
            // res.status(400).send("User không tồn tại");
            failCode(res, user_id, "User không tồn tại !");
        }

    } catch (err) {
        // res.status(500).send("lỗi Backend");
        errorCode(res, "Lỗi Backend")
    }
}
//D => .destroy()

//upload 

const uploadUser = async (req, res) => {
    const fs = require('fs');

    if (req.file.size >= 400000) {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    console.log(req.file.mimetype)
    if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("sai định dạng");
    }

    fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
        // `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;

        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        // lưu database
        //xử lý xóa file
        setTimeout(() => {
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);

        }, 5000);
        res.send(dataBase);
    })
}

const bcrypt = require('bcrypt');
// signup
const signUp = async (req, res) => {
    try {
        let { full_name, email, pass_word } = req.body;
        //mã hóa password
        let passWordHash = bcrypt.hashSync(pass_word, 10);

        let checkEmail = await model.user.findOne({
            where: {
                email
            }
        })
        if (checkEmail) {
            failCode(res, "", "Email đã tồn tại!");
        } else {
            let data = await model.user.create({
                full_name,
                email,
                pass_word: passWordHash
            });
            sucessCode(res, data, "Đăng ký thành công !");

        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend");
    }
}
//login
const login = async (req, res) => {
    try {
        let { email, pass_word } = req.body;
        let checkLogin = await model.user.findOne({
            where: {
                email
            }
        })

        if (checkLogin) {
            let checkPass = bcrypt.compareSync(pass_word, checkLogin.pass_word);
            //true => khớp
            if (checkPass) {
                sucessCode(res, parseToken(checkLogin), "Login thành công");
            } else {
                failCode(res, "", "Mật khẩu không đúng !");

            }
        } else {
            failCode(res, "", "Email không đúng !");
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend");
    }
}

//commonjs module
module.exports = {
    getUser,
    createUser,
    updateUser,
    uploadUser,
    signUp,
    login
}