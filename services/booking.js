const con = require('../helper/db')

const save = async (data) => {
    console.log("Here is end data",data)
    try {
        let bookingObj = {
            scheduled_date: data.scheduled_date,
            scheduled_time: data.scheduled_time,
            description: data.description,
            status: 'New',
            address_id: data.address_id
        }
        const saveBookingRes = await con.booking(bookingObj).save()
        if (saveBookingRes) {
            let serviceIds = data.serviceIds
            let serviceNames = []
            serviceIds.forEach(async (el) => {
                let bSeviceObj = {
                    user_id: data.user_id,
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

//#region ---VENDOR SIDE EVENT---

const accept = async (vendor_id, booking_id) => {
    try {
        updObj = {
            status: 'Accepted By Vendor',
            vendor_id: vendor_id
        }
        const acceprRes = await con.booking.updateOne({ _id: booking_id }, updObj)
        if (acceprRes.ok){
            
        }
                
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

//#endregion


module.exports = {
    save,
    accept
}