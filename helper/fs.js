var fs = require('fs')
const uuid = require('uuid')

const uploadFile = async (fileObj) => {//'fileObj' receive as object
    if (fileObj.fileBase64) {
        if (fileObj.fileBase64.includes('base64'))
            fileObj.fileBase64 = fileObj.fileBase64.split('base64,').pop()
    }
    try {
        const file_uid = uuid.v4()
        fs.writeFileSync(`./uploads/${fileObj.repository}/` + file_uid + fileObj.ext, fileObj.fileBase64, { encoding: 'base64' })
        const path = `/${fileObj.repository}/` + file_uid + fileObj.ext
        return { status: true, imgPath: path, image_name: file_uid + fileObj.ext }
    }
    catch (err) {
        return { status: false, error: err.toString() }
    }
}


const deleteFile = async (fileObj) => {
    try {
        const obj = fs.unlinkSync(`./uploads/${fileObj.repository}/` + fileObj.fileName)
        // const obj = { ...fileResponse._doc, 'byteArr': byteArr } // copy fileResponse data and add new byteArr key to new obj using spread operator
        return { status: true }
    } catch (err) {
        return { status: false, error: err.toString() }
    }

}


module.exports = {
    uploadFile,
    deleteFile
}
