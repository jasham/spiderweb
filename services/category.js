const con = require('../helper/db')
const image = require('../services/image')

const save = async (data) => {
    try {
        let saved = []
        let exists = []
        let count = 0
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const exist = await con.category.exists({ category: data[i].category, deleted: false })
                if (exist) {
                    exists.push({ category: data[i].category })
                } else {
                    const save_res = await new con.category(data[i]).save()
                    saved.push(save_res)
                }
                count++
            }
        }
        //if (count === data.length)
        return { status: true, saved, exists }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let finalArray = []
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { deleted: false, category: { $regex: '.*' + queryParams.search + '.*', $options: 'i' } }
        const cat = await con.category.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.category.countDocuments(qry)
        if (cat.length > 0) {
            for (let i = 0; i < cat.length; i++) {
                let obj = { ...cat[i].toObject() }
                obj.sub_category_count = await con.sub_category.countDocuments({ category_id: cat[i]._id, deleted: false })
                obj.category_image_count = await con.image.countDocuments({ category_id: cat[i]._id, deleted: false })
                finalArray.push(obj)
            }
        }
        return { status: true, record: { category: finalArray, totalRecords, currentPage: queryParams.currentPage } }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (ids) => {
    try {
        let count = 0
        if (ids.length > 0) {
            for (let i = 0; i < ids.length; i++) {
                const del_service = await con.category.updateOne({ _id: ids[i]._id }, { deleted: true, active: false })
                if (del_service.ok === 1) {
                    await con.sub_category.updateMany({ category_id: ids[i]._id }, { deleted: true, active: false })
                    await con.service.updateMany({ category_id: ids[i]._id }, { deleted: true, active: false })
                }
                count++
            }
        }
        return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        let count = 0
        let exists = []
        let updated = []

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let updateObj = {
                    category: data[i].category,
                    rut: Date.now()
                }
                const exist = await con.category.exists({ category: data[i].category, deleted: false, _id: { $nin: data[i]._id } })
                if (exist) {
                    exists.push({ category: data[i].category })
                } else {
                    const update_res = await con.category.findOneAndUpdate({ _id: data[i]._id }, updateObj, { new: true })
                    updated.push(update_res)
                }
                count++
            }
        }
        // if (count === data.length) {
        return { status: true, exists, updated }
        //}
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

        const update_active_status = await con.category.updateOne({ _id: id }, { active: status })
        if (update_active_status) {
            const update_sub_cat_status = await con.sub_category.updateMany({ category_id : id }, { active: status })
            if(update_sub_cat_status){
                const update_grp_active = await con.group.updateOne({ _id: update_active_status.group_id }, { active: status })
                if (update_grp_active){
                    const venDorGroup = await con.vendor_group.updateOne({ group_id : update_active_status.group_id }, { active : status })
                    if(venDorGroup.ok)
                    return { status: true }
                }
            }
        }
        

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const categoryImage = async (data) => {
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
    categoryImage,
    listImage,
    deleteImage,
    activeImage
}


