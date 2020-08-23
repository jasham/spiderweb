const con = require('../helper/db')

SaveStudent = async (data) => {
    try {
        const saveResult = await new con.studentModel(data).save();
        if (saveResult != undefined)
            return saveResult
    } catch (error) {
        console.log(error)
    }
}

AllStudent = async () => {
    try {
        let list = await con.studentModel.find({}, { __v: 0 });
        return list
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    SaveStudent,
    AllStudent
}