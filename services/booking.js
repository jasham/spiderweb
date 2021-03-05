const con = require('../helper/db')

//#region ---USER SIDE EVENTs---
const save = async (data) => {
    try {
        let bookingObj = {
            scheduled_date: data.scheduled_date,
            scheduled_time: data.scheduled_time,
            description: data.description,
            status: 'New',
            address_id: data.address_id,
            user_id: data.user_id
        }
        const saveBookingRes = await con.booking(bookingObj).save()
        if (saveBookingRes) {
            let serviceIds = data.serviceIds
            let serviceNames = []
            serviceIds.forEach(async (el) => {
                let bSeviceObj = {
                    service_id: el.service_id,
                    sub_category_id: data.sub_category_id,
                    booking_id: saveBookingRes._id
                }
                await con.booking_service(bSeviceObj).save()
                const bookService = await con.service.findOne({ _id: el.service_id }, { service: 1 })
                serviceNames.push({ service: bookService.service })
            })
            const userAddress = await con.address.findOne({ _id: data.address_id, user_id: data.user_id }, { latitude: 1, longitude: 1 })
            const bookSubCategory = await con.sub_category.findOne({ _id: data.sub_category_id }, { sub_category: 1 })
            // have to add data in vendor notification table

            const notificationDetails = {// this details go to vendor by io socket , can add more fields as per requirement
                latitude: userAddress.latitude,
                longitude: userAddress.longitude,
                sub_category: bookSubCategory.sub_category,
                services: serviceNames,
                scheduled_date: data.scheduled_date,
                scheduled_time: data.scheduled_time,
                description: data.description,
                booking_id: saveBookingRes._id
            }
            return { status: true, notificationDetails }
        }
        return { status: false, error: 'something wrong to save data in booking' }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const acceptByUser = async (user_id, booking_id) => {
    try {
        updObj = {
            status: 'Accepted By User'
        }
        const acceptRes = await con.booking.updateOne({ _id: booking_id, user_id: user_id }, updObj)
        if (acceptRes.ok) {
            const user = await con.user.findById(user_id)
            const userCredential = await con.credential.findById(user.credential_id)
            const booking = await con.booking.findById(booking_id)
            const address = await con.address.findById(booking.address_id)
            const bookedServices = await con.booking_service.find({ booking_id: booking_id }, { sub_category_id: 1, service_id: 1 })
            const subCategory = await con.sub_category.findById(bookedServices[0].sub_category_id)
            const detailsAfterAcceptByUser = {
                name: user.name,
                mobile: userCredential.mobile,
                image_url: user.image_url,
                vendor_id: booking.vendor_id,
                sub_category: subCategory.sub_category,
                scheduled_date: booking.scheduled_date,
                scheduled_time: booking.scheduled_time,
                address
            }
            return { status: true, detailsAfterAcceptByUser }
        }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}
//#endregion

//#region ---VENDOR SIDE EVENTs---
const acceptByVendor = async (vendor_id, booking_id) => {
    try {
        updObj = {
            status: 'Accepted By Vendor',
            vendor_id: vendor_id
        }
        const exist = await con.booking.exists({ _id: booking_id, status: 'Accepted By Vendor' })
        if (exist)
            return { status: 'alreadyAccepted' }
        else {
            const acceptRes = await con.booking.updateOne({ _id: booking_id }, updObj)
            if (acceptRes.ok) {
                const vendor = await con.vendor.findById(vendor_id)
                const user = await con.user.findById(vendor.user_id)
                const userCredential = await con.credential.findById(user.credential_id)
                const booking = await con.booking.findById(booking_id)
                const bookedServices = await con.booking_service.find({ booking_id: booking_id }, { sub_category_id: 1, service_id: 1 })
                const subCategory = await con.sub_category.findById(bookedServices[0].sub_category_id)
                const detailsAfterAcceptByVendor = {
                    name: vendor.name,
                    mobile: userCredential.mobile,
                    image_url: user.image_url,
                    vendor_id,
                    sub_category: subCategory.sub_category,
                    scheduled_date: booking.scheduled_date,
                    scheduled_time: booking.scheduled_time,
                    user_id: booking.user_id
                }
                return { status: true, detailsAfterAcceptByVendor }
            }
        }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}
//#endregion


module.exports = {
    save,
    acceptByVendor,
    acceptByUser
}