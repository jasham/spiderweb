const con = require('../helper/db')

SaveTeacher = async (data) => {
    try {
        
        const saveResult = await new con.teacherModel(data).save();
        if (saveResult != undefined)
            return saveResult
    } catch (error) {
        console.log(error)
    }
}

AllTeacher = async () => {
    try {
        let list = await con.teacherModel.find({}, { __v: 0 });
        return list
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    SaveTeacher,
    AllTeacher
}