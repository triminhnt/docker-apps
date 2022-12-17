//R: GET food
const getFood = async (req, res) => {

    // include => JOIN table

    //SELECT * FROM food JOIN food_type
    // include hỗ trợ dữ liệu object và list object
    let dataFood = await model.restaurant.findAll(
        {
            include: ["user_id_users"]
        }
    );
    //let dataUser = await model.user.findAll();

    res.send(dataFood);
}

module.exports = {
    getFood
}