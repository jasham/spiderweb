const con = require('../helper/db')
const fs = require('../helper/fs')

const save = async (data) => {
    try {
        let fileObj = {
            fileBase64: data.image_string,
            ext: data.image_ext
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
            imgSaveRes

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

module.exports = { save }
