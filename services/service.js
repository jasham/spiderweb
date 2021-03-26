const con = require('../helper/db')
const image = require('../services/image')

const save = async (data) => {
    try {
        const exist = await con.service.exists({ service: data.service, category_id: data.category_id, sub_category_id: data.sub_category_id, deleted: false })
        if (exist)
            return { status: 'exist' }
        data = {
            ...data,
            amount: data.amount ? Number(data.amount) : 0
        }
        const save_res = await new con.service(data).save()
        return { status: true, save_res }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let finalArray = []
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { deleted: false, sub_category_id: queryParams.sub_category_id, service: { $regex: '.*' + queryParams.search + '.*', $options: 'i' } }
        const serviceList = await con.service.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.service.countDocuments(qry)
        if (serviceList.length > 0) {
            for (let i = 0; i < serviceList.length; i++) {
                let obj = { ...serviceList[i].toObject() }
                obj.service_image_count = await con.image.countDocuments({ service_id: serviceList[i]._id, deleted: false })
                finalArray.push(obj)
            }
        }
        return { status: true, record: { service: finalArray, totalRecords, currentPage: queryParams.currentPage } }

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
            amount: data.amount ? Number(data.amount) : 0,
            description: data.description
        }
        const update_category = await con.service.updateOne({ _id: data._id }, updateObj)
        if (update_category.ok)
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

        const update_active_status = await con.service.updateOne({ _id: id }, { active: status })
        if (update_active_status.ok)
            return { status: true }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const serviceImage = async (data) => {
    try {
        const img_res = await image.save_cat_sub_service(data)
        return img_res
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const listImage = async (queryParams) => {
    try {
        const img_res = await image.list_cat_sub_service(queryParams)
        return img_res
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const deleteImage = async (_id) => {
    try {
        const img_res = await image.remove_cat_sub_service(_id)
        return img_res
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const activeImage = async (image_id, _id, img,type,status) => {
    try {
        const img_res = await image.active_cat_sub_service(image_id, _id, img,type,status)
        return img_res
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
    serviceImage,
    listImage,
    deleteImage,
    activeImage
}

