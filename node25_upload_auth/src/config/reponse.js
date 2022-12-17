// 200 , 400 , 500
const sucessCode = (res, data, message) => {
    res.status(200).json({
        message,
        content: data
    });
}

//400
const failCode = (res, data, message) => {
    res.status(400).json({
        message,
        content: data
    });
}
//500
const errorCode = (res,message) => {
    res.status(500).send(message);
}
module.exports = {
    sucessCode,
    failCode,
    errorCode
}