const con = require('../helper/db')

const save = async (data) => {
    try {
        const exist = await con.sub_category.exists({ sub_category: data.sub_category, category_id: data.category_id, deleted: false })
        if (exist)
            return { status: 'exist' }

        const grpObj = {
            group_name: data.sub_category
        }
        const save_grp = await new con.group(grpObj).save()
        data.group_id = save_grp._id
        const save_sub_cat = await new con.sub_category(data).save()
        return { status: true, save_sub_cat }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async () => {
    try {
        const list = await con.sub_category.find({ category_id: cat_id, deleted: false }, { __v: 0 }).sort({ _id: -1 })
        return { status: true, list }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.sub_category.updateOne({ _id: id }, { deleted: true, active: false })
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
            sub_category: data.sub_category,
            rut: Date.now()
        }
        const update_sub_category = await con.sub_category.updateOne({ _id: data._id }, updateObj)
        if (update_sub_category.ok) {
            const grpObj = {
                group_name: data.sub_category
            }
            const update_grp = await con.group.updateOne({ _id: data.group_id }, grpObj)
            if (update_grp.ok)
                return { status: true }
        }

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


