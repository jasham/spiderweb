const con = require('../helper/db')
const { send_otp } = require('../helper/mobile_service')
const fs = require('../helper/fs')

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

const active_vendor = async (id, active_status) => {
    try {
        let updateObj = {}
        if (active_status === 'true'){
            update = {
                active : true,
                status : 'Available'
            }
        }else {
            update = {
                active : false,
                status : 'Unavailable'
            }
        }

        const update_active_status = await con.vendor.updateOne({ _id: id }, updateObj)
        if (update_active_status.ok)
            return { status: true, updateObj }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const generate_otp = async (data) => {
    try {
        // let otp = 123456
        let otp = Math.floor(100000 + Math.random() * 900000)
        const log = {
            otp : otp,
            credential_id : data.id
        }
        const generate_otp = await new con.otpLog(log).save()
        if(generate_otp){
            let messageRes = `A 6-digits OTP has sent to your mobile number. Kindly, check it.`
            data.message = `Thanks for choosing spider-way! Here is your 6-digits OTP to verify your mobile number. OTP : ${otp}`
                        /**
             *  CODE FOR SENDING OTP TO MOBILE
             * @params mobile
             * @params otp
             */
            let otpRes = await send_otp(data)
            console.log( "sssss", otpRes);
            if(otpRes.status) return { status: true, messageRes}
            else return { status: false, messageRes: "Something went wrong while sending OTP."}
        }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const verify_otp_update_mobile = async (data) => {
    try {
        const verify = {
            otp : data.otp,
            used : false,
            credential_id : data.id
        }
        const verify_otp = await con.otpLog.findOne(verify)
        if(verify_otp){
            const update = {
                mobile: data.mobile
            }
            const update_mobile = await new con.credential.updateOne({ _id: id }, update)
            if (update_mobile.ok)
                return { status: true }
        } else return { status : false, error: 'Otp is incorrect / already used'}
        

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update_image = async (data) => {
    try {
        let fileObj = {
            fileBase64: data.image_string,
            ext: data.image_ext,
            repository: data.repository,
            name:data.name
        }
        const imgSaveRes = await fs.uploadFile(fileObj)
        if (imgSaveRes.status) {
            delete data.image_string
            delete data.image_ext
            let image_url = data.hostUrl + imgSaveRes.imgPath
            delete data.hostUrl
            const updatedImg = await con.user.findOneAndUpdate({_id : data.user_id}, {image_url: image_url}, { new: true})           
            return { status: true, image_url: updatedImg.image_url }
        }
        else // if error from fs file
            return { status: false, error: imgSaveRes.error }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const newBookingList = async (queryParams) => {
    try {
        let notifications = []
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        let qry = { notification_receiver_id: queryParams.vendor_id, booking_id: { $ne: null } } //booking_id not null
        const notificationBookingList = await con.notification.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        if (notificationBookingList.length > 0) {
            notificationBookingList.forEach( async (el,index) => {
                const booking = await con.booking.findById(el.booking_id, { booking_date: 1 })
                if (booking.booking_date <= new Date()){
                    notificationBookingList.splice(index,1) 
                }
            })
        }
        const totalRecords = await con.notification.countDocuments(qry)
        return { status: true, record: { notifications, totalRecords, currentPage: queryParams.currentPage } }
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
    active_vendor,
    list_sub_cat_grp,
    generate_otp,
    verify_otp_update_mobile,
    update_image,
    newBookingList
}