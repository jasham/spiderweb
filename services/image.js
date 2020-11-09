const con = require('../helper/db')
const fs = require('../helper/fs')

const save_cat_sub_service = async (data) => {
    try {
        let fileObj = {
            fileBase64: data.image_string,
            ext: data.image_ext,
            repository: data.repository
        }
        const imgSaveRes = await fs.uploadFile(fileObj)
        if (imgSaveRes.status) {
            delete data.image_string
            delete data.image_ext
            data.image_url = data.hostUrl + imgSaveRes.imgPath
            delete data.hostUrl
            const imgObj = await new con.image(data).save()
            return { status: true, imgObj }
        }
        else // if error from fs file
            return { status: false, error: imgSaveRes.error }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list_cat_sub_service = async (queryParams) => {
    try {
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = {}
        if (queryParams.image.toLowerCase() === 'category')
            qry = { deleted: false, category_id: queryParams.category_id }
        else if (queryParams.image.toLowerCase() === 'sub_category')
            qry = { deleted: false, sub_category_id: queryParams.sub_category_id }
        else//service
            qry = { deleted: false, service_id: queryParams.service_id }
        const image = await con.image.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        const totalRecords = await con.image.countDocuments(qry)
        return { status: true, record: { image, totalRecords, currentPage: queryParams.currentPage } }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove_cat_sub_service = async (image_id) => {
    try {

        const del_service = await con.category.findById(image_id,{})
        if (del_service.ok === 1) {
            await con.sub_category.updateMany({ category_id: ids[i]._id }, { deleted: true, active: false })
            await con.service.updateMany({ category_id: ids[i]._id }, { deleted: true, active: false })
        }
        return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save_cat_sub_service,
    list_cat_sub_service
}
