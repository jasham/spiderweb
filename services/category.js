const con = require('../helper/db')

const save = async (data) => {
    try {
        const exist = await con.category.exists({ category: data.category, deleted: false })
        if (exist)
            return { status: 'exist' }

        const save_res = await new con.category(data).save()
        return { status: true, save_res }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async () => {
    try {
        const list = await con.category.find({ deleted: false }, { __v: 0 }).sort({ _id: -1 })
        return { status: true, list }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.category.updateOne({ _id: id }, { deleted: true, active: false })
        if (del_service.ok)
            return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        const updateObj = {
            category: data.category,
            rut: Date.now()
        }
        const update_category = await con.category.updateOne({ _id: data._id }, updateObj)
        if (update_category.ok)
            return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save,
    list,
    remove,
    update
}

