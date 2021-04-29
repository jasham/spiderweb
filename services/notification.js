const con = require('../helper/db')

const save = async (data) => {
    try {
        const saveRes = await con.notification(data).save()
        if (saveRes)
            return { status: true, saveRes }
        return { status: false, error: 'Something wrong to save data in notification' }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let notifications = []
        let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
        //let searchBy = queryParams.searchBy//searchBy can be user_id or vender_id
        let qry = { notification_receiver_id: queryParams.notification_receiver_id, is_seen: false, booking_id: null }
        const notList = await con.notification.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
        if (notList.length > 0) {
            notList.forEach(el => {
                let obj = {
                    //user_id: el.user_id,
                    notification_detail: el.notification_detail
                }
                notifications.push(obj)
            })
        }
        const totalRecords = await con.notification.countDocuments(qry)
        return { status: true, record: { notifications, totalRecords, currentPage: queryParams.currentPage } }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const seen = async (id, notification_receiver_id) => {
    try {
        let qry = { _id: id, notification_receiver_id: notification_receiver_id }
        const update_res = await con.notification.updateOne(qry, { is_seen: true, seen_on: new Date() })
        if (update_res.ok)
            return { status: true }
        else
            return { status: false, error: 'Something wrong to update notification seen record' }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const count = async (notification_receiver_id) => {
    try {
        let qry = { notification_receiver_id: notification_receiver_id, is_seen: false, booking_id: null }
        const total = await con.notification.countDocuments(qry)
        return { status: true, total }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save,
    list,
    seen,
    count
}