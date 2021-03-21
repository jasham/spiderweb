const con = require('../helper/db')

const save = async (data) => {
    try {
        const exist = await con.vendor_group.exists({ vendor_id: data.vendor_id, group_id: data.group_id, deleted: false })
        if (exist)
            return { status: 'exist' }

        const save_ved_grp = await new con.vendor_group(data).save()
        return { status: true, save_ved_grp }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { deleted: false, vendor_id: queryParams.vendor_id }
        const ved_grp = await con.vendor_group.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.vendor_group.countDocuments(qry)

        return { status: true, record: { vendor_group: ved_grp, totalRecords, currentPage: queryParams.currentPage } }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.vendor_group.updateOne({ _id: id }, { deleted: true, active: false })
        if (del_service.ok)
            return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        const exist = await con.vendor_group.exists({ vendor_id: data.vendor_id, group_id: data.group_id, deleted: false, _id: { $nin: data._id } })
        if (exist)
            return { status: 'exist' }

        data.rut = Date.now()
        const update_ved_grp = await con.vendor_group.updateOne({ _id: data._id }, data)
        if (update_ved_grp.ok)
            return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const active = async (id, active_status) => {
    try {
        let status
        if (active_status === 'true')
            status = true
        else
            status = false

        const update_active_status = await con.vendor_group.updateOne({ _id: id }, { active: status })
        if (update_active_status.ok)
            return { status: true }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list_sub_cat_grp = async () => {
    try {
        const sub_cat_ven = await con.group.find({ active: true, deleted: false }, { group_name: 1 }).sort({ _id: -1 })
        return { status: true, vendor_sub_category: sub_cat_ven }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save,
    list,
    remove,
    update,
    active,
    list_sub_cat_grp
}