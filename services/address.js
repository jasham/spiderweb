const con = require('../helper/db')

const save = async (data) => {
    try {
        const saveRes = await con.address(data).save()
        if (saveRes)
            return { status: true, saveRes }
        return { status: false, error: 'something wrong to save data in address' }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (user_id) => {
    try {
        const list = await con.address.find({ user_id: user_id })
        return { status: true, list }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const deleteRes = await con.address.deleteOne(id)
        if (deleteRes.ok)
            return { status: true }
        return { status: false, error: 'something wrong to delete data in address' }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        data.rct = Date.now()
        const updateRes = await con.address.findOneAndUpdate({ _id: data._id, user_id: data.user_id }, data, { new: true })
        if (updateRes)
            return { status: true }
        return { status: false, error: 'something wrong to update data in address' }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

module.exports = {
    save,
    update,
    remove,
    list
}