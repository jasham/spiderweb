var fs = require('fs')
const uuid = require('uuid')

const upload = async (fileObj) => {//'fileObj' receive as object
    if (fileObj.fileBase64) {
        if (fileObj.fileBase64.includes('base64'))
            fileObj.fileBase64 = fileObj.fileBase64.split('base64,').pop()
    }
    try {
        const file_uid = uuid.v4() 
        fs.writeFileSync(`./uploads/${fileObj.repository}/` + file_uid + fileObj.ext, fileObj.fileBase64, { encoding: 'base64' })
        const path = `/${fileObj.repository}/` + file_uid + fileObj.ext
        return { status: true, imgPath: path }
    }
    catch (err) {
        return { status: false, error: err.toString() }
    }
}


//#region Using Multer Library to upload file from reactjs antd ui

const uploadM = async req => {
    try {
        fileObj = {
            fileName: req.file.originalname,
            mimeType: req.file.mimetype,
            file_uid: req.body.file_uid
        }
        const fsResponse = await uploadFile(fileObj)
        if (fsResponse != undefined)
            return { result: 'success' }
    }

    catch (err) {
        return { result: 'error', err: err }
    }

}

//#endregion



const download = async (uid) => {

    try {
        var fileResponse = await fsModel.findOne({ file_uid: uid }
            // {
            //   mimeType: 1,
            //   file_uid: 1,
            //   fileName: 1
            // }
        )

        if (fileResponse == null)
            return { result: 'noResult', fileData: fileResponse }

        let byteArr = fs.readFileSync('./uploads/' + fileResponse.file_uid)
        const obj = { ...fileResponse._doc, 'byteArr': byteArr } // copy fileResponse data and add new byteArr key to new obj using spread operator
        return { result: 'success', fileData: obj }

    } catch (err) {
        return { result: 'error', err: err }
    }

}

const deleteFile = async (uid) => {
    try {
        var fileResponse = await fsModel.deleteOne({ file_uid: uid })

        if (fileResponse == null)
            return { result: 'noResult', fileData: fileResponse }

        //const obj = fs.unlinkSync('./uploads/' + fileResponse.file_uid)
        const obj = fs.unlink('./uploads/' + uid, function (err) {
            if (err)
                throw err
        })

        // let byteArr = fs.readFileSync('./uploads/' + fileResponse.file_uid)
        // const obj = { ...fileResponse._doc, 'byteArr': byteArr } // copy fileResponse data and add new byteArr key to new obj using spread operator
        return { result: 'success', fileData: obj }

    } catch (err) {
        return { result: 'error', err: err }
    }

}


module.exports = {
    uploadFile: upload,
    downloadFile: download,
    deleteFile: deleteFile,
    uploadFileFromMulter: uploadM
}
