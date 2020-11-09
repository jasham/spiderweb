const con = require('../helper/db')
const image = require('../services/image')

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

const list = async (queryParams) => {
    try {
        let finalArray = []
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { deleted: false, category_id: queryParams.category_id, sub_category: { $regex: '.*' + queryParams.search + '.*', $options: 'i' } }
        const sub_cat = await con.sub_category.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.sub_category.countDocuments(qry)
        if (sub_cat.length > 0) {
            for (let i = 0; i < sub_cat.length; i++) {
                let obj = { ...sub_cat[i].toObject() }
                obj.service_count = await con.service.countDocuments({ sub_category_id: sub_cat[i]._id, deleted: false })
                obj.sub_category_image_count = await con.image.countDocuments({ sub_category_id: sub_cat[i]._id, deleted: false })
                finalArray.push(obj)
            }
        }
        return { status: true, record: { sub_category: finalArray, totalRecords, currentPage: queryParams.currentPage } }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.sub_category.updateOne({ _id: id }, { deleted: true, active: false })
        if (del_service.ok)
            await con.service.updateMany({ sub_category_id: id }, { deleted: true, active: false })
        return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        const exist = await con.sub_category.exists({ sub_category: data.sub_category, deleted: false, _id: { $nin: data._id } })
        if (exist)
            return { status: 'exist' }

        const updateObj = {
            sub_category: data.sub_category,
            category_id: data.category_id,
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

const subCategoryImage = async (data) => {
    try {
        const img_res = await image.save_cat_sub_service(data)
        return img_res
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const listImage = async (queryParams) => {
    try {
        const img_res = await image.list_cat_sub_service(queryParams)
        return img_res
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const deleteImage = async (_id) => {
    try {
        const img_res = await image.remove_cat_sub_service(_id)
        return img_res
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const listDetailedSubCategory = async () => {
    try {
        const sub_cat = await con.sub_category.aggregate([
            {
                $lookup: {
                    from: "Image", // collection name in db
                    localField: "_id",
                    foreignField: "sub_category_id",
                    as: "image"

                }
            },
            {
                $project: {
                    sub_category: 1,
                    "image" : [ "image"]
                }
            }
        ])
        console.log("Detailed sub category", sub_cat)
        return { status: true, sub_cat }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save,
    list,
    remove,
    update,
    subCategoryImage,
    listImage,
    deleteImage,
    listDetailedSubCategory,
}


