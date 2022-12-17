
const multer = require('multer');
const storage = multer.diskStorage({
    //định nghĩa đường dẫn lưu file
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/public/img");
    },
    //đổi tên file khi upload (trước khi lưu file)
    filename: (req, file, cb) => {
        let fileName = Date.now() + "_" + file.originalname; // => tên file gốc chứa định dạng file để hiển thị
        cb(null, fileName);
    }
})
const upload = multer({ storage });


module.exports = {
    upload
}