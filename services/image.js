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
            data.image_name = imgSaveRes.image_name
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
        const existImage = await con.image.findById(image_id)
        if (existImage) {
            const detImg = await con.image.findByIdAndDelete(image_id)
            let fileObj = {
                fileName: existImage.image_name,
                repository: 'images'
            }
            
            const imgDelRes = await fs.deleteFile(fileObj)
            if (detImg)
                return { status: true }
            return { status: false }
        }
        return { status: false, error: 'somthing wrong to find image object to delete image' }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const active_cat_sub_service = async (image_id, _id, image,type,activeStatus) => {
    try {
        let qry = {}
        if (image === 'category')
            qry = { category_id: _id,type:type }
        else if (image === 'sub_category')
            qry = { sub_category_id: _id,type:type }
        else//service
            qry = { service_id: _id ,type:type}

        const updateFalse = await con.image.updateMany(qry, { active: false })
        if (updateFalse.ok) {
            const updateTrue = await con.image.findByIdAndUpdate(image_id, { active: activeStatus})
            return { status: true }
        }
        return { status: false, error: 'somthing wrong to update image status false' }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save_cat_sub_service,
    list_cat_sub_service,
    remove_cat_sub_service,
    active_cat_sub_service
}
