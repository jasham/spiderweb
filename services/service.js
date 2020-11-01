const con = require('../helper/db')

const save = async (data) => {
    try {
        const exist = await con.service.exists({ service: data.service, category_id: data.category_id, sub_category_id: data.sub_category_id, deleted: false })
        if (exist)
            return { status: 'exist' }
        data = {
            ...data,
            amount: data.amount ? Number(data.amount) : null
        }
        const save_res = await new con.service(data).save()
        return { status: true, save_res }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { deleted: false, sub_category_id: queryParams.sub_category_id, service: { $regex: '.*' + queryParams.search + '.*', $options: 'i' } }
        const serviceList = await con.service.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.service.countDocuments(qry)
      
        return { status: true, record: { service: serviceList, totalRecords, currentPage: queryParams.currentPage } }

    } catch (error) {
        return { status: false, error: error.toString() }
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
        const exist = await con.service.exists({ service: data.service, deleted: false, _id: { $nin: data._id } })  
        if (exist)
            return { status: 'exist' }

        const updateObj = {
            service: data.service,
            amount: data.amount ? Number(data.amount)  : 0 ,
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
    remove,
    update
}

