const con = require('../helper/db')

const save = async (req) => {
    try {
        req.app.io.emit(req.body.group_id,"hello")
        const service_exists = await con.service.find({ category_id : req.body.category_id, _id : req.body.sub_category_id, _id : req.body.service_id })
        if(service_exists){
            console.log("Service exists",service_exists) 
        }else{
            // return category not exists failure
        }
        return true
        // check address id exist or not

        // check for socket id for user exist or not

        // save the data related to bookings

        // save the data related to booking services

        
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

module.exports = {
    save
}