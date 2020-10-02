const con = require('../helper/db')

const save = async (data) => {
    try {
        const exist = await con.service.exists({ service: data.service, category_id: data.category_id, sub_category_id: data.sub_category_id, deleted: false })
        if (exist)
            return { status: 'exist' }
        data = {
            ...data,
            amount: Number(data.amount)
        }
        const save_res = await new con.service(data).save()
        return { status: true, save_res }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (cat_id, sub_cat_id) => {
    try {
        const list = await con.service.find({ category_id: cat_id, sub_category_id: sub_cat_id, deleted: false }, { __v: 0 }).sort({ _id: -1 })
        return { status: true, list }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list_specific_services = async (id) => {
    try {
        const specific_service = await con.service.findOne({ _id: id })
        console.log("Here is data hand", specific_service)
        if (specific_service) {
            return
        } else
            return JSON.parse(JSON.stringify({ status: "no service" }))
    } catch (error) {
        console.log(error)
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.service.updateOne({ _id: id }, { deleted: true, active: false })
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
            service: data.service,
            amount: Number(data.amount),
            description: data.description,
            rut: Date.now()
        }
        const update_category = await con.service.updateOne({ _id: data._id }, updateObj)
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
    list,
    remove,
    update
}

