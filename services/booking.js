const con = require("../helper/db");
const axios = require('axios')

//#region ---USER SIDE EVENTs---
const save1 = async (data) => {
  try {
    let bookingObj = {
      scheduled_date: data.scheduled_date,
      scheduled_time: data.scheduled_time,
      description: data.description,
      status: "New",
      address_id: data.address_id,
      user_id: data.user_id,
      sub_category_id: data.sub_category_id,
    };
    const saveBookingRes = await con.booking(bookingObj).save()
    console.log("1234567898765432123456789", saveBookingRes)
    if (saveBookingRes) {
      let serviceIds = data.serviceIds;
      let serviceNames = [];
      serviceIds.forEach(async (el) => {
        let bSeviceObj = {
          service_id: el.service_id,
          booking_id: saveBookingRes._id,
        };
        await con.booking_service(bSeviceObj).save()
        const bookService = await con.service.findOne(
          { _id: el.service_id },
          { service: 1 }
        );
        serviceNames.push({ service: bookService.service });
      });
      const userAddress = await con.address.findOne(
        { _id: data.address_id, user_id: data.user_id },
        { latitude: 1, longitude: 1, city: 1, state: 1 }
      );
      const bookSubCategory = await con.sub_category.findOne(
        { _id: data.sub_category_id },
        { sub_category: 1, group_id: 1 }
      );
      const notificationDetails = {
        //this details go to vendor by io socket, can add more fields as per requirement
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
        sub_category: bookSubCategory.sub_category,
        services: serviceNames,
        scheduled_date: data.scheduled_date,
        scheduled_time: data.scheduled_time,
        description: data.description,
        booking_date: saveBookingRes.booking_date,
        booking_id: saveBookingRes._id,
        group_id: bookSubCategory.group_id,
      }
      //   const vendorGrp = await con.vendor_group.find(
      //     { group_id: bookSubCategory.group_id, active: true, approved: true },
      //     { vendor_id: 1 }
      //   );
      const vendorGrp = await con.address.aggregate([
        { $match: { city: userAddress.city, state: userAddress.state } },
        { $lookup: { from: 'Vendor_FCM_Tokens', localField: 'user_id', foreignField: 'vendor_id', as: 'token' } },
        { $lookup: { from: 'Vendors', localField: 'user_id', foreignField: 'user_id', as: 'vendor' } },
        { $unwind: "$vendor" },
        { $lookup: { from: 'VendorGroups', localField: 'vendor.user_id', foreignField: 'vendor_id', as: 'vendorGroup' } },
        { $unwind: "$vendorGroup" },
      ])
      console.log("qwertyuio", notificationDetails, vendorGrp)
      if (vendorGrp.length > 0) {
        let vendorNotificationArr = []
        vendorGrp.forEach(async (el) => {
          let notificationObj = {
            notification_receiver_id: el.vendorGroup.vendor_id,
            booking_id: saveBookingRes._id,
            notification_detail: notificationDetails,
          };
          console.log("qwertyuio1234567890", notificationObj)
          vendorNotificationArr.push(notificationObj)
        });
        const saveNotificationRes = await con.notification.create(vendorNotificationArr)
      }
      return { status: true, notificationDetails }
    }
    return { status: false, error: "something wrong to save data in booking" }
  } catch (error) {
    return { status: false, error: error.toString() }
  }
};

const save = async (data) => {
  let notiData = {
    tokens: 'c81I-4c3Z_NAsbZ7cJVweW:APA91bHiWopcByUskjGepqAtbj3OkGZG44C5nZBNrJN_MxIpeXB8MMSUIYAhxYGMFxwkoSnCPCYgJMlM9O1zg2i3waTDjTDlRJX8FAXjnNqSdLZSW-JjUvdfkTFV_G9EZim5l0u-FgQu',
    content_data: "Hello Ninja"
  }
  console.log("Here is reached")
  try {

    const res = await axios.post("https://us-central1-spider-d2a9d.cloudfunctions.net/paymentNotification", notiData);
    console.log("Here is response ninja 873482783", res)``
  } catch (err) {
    console.error(err);
  }
  return { status: true };
}

const acceptByUser = async (user_id, booking_id) => {
  try {
    updObj = {
      status: "Accepted By User",
    };
    const acceptRes = await con.booking.updateOne(
      { _id: booking_id, user_id: user_id },
      updObj
    );
    if (acceptRes.ok) {
      const user = await con.user.findById(user_id);
      const userCredential = await con.credential.findById(user.credential_id);
      const booking = await con.booking.findById(booking_id);
      const address = await con.address.findById(booking.address_id);
      const bookedServices = await con.booking_service.find(
        { booking_id: booking_id },
        { service_id: 1 }
      );
      const subCategory = await con.sub_category.findById(
        booking.sub_category_id
      );
      const notification_detail = {
        scheduled_date: booking.scheduled_date,
        scheduled_time: booking.scheduled_time,
        sub_category: subCategory.sub_category,
        address,
      };
      const notificationObj = {
        notification_receiver_id: booking.vendor_id,
        notification_detail,
      };
      const saveNotification = await con.notification(notificationObj).save();
      const detailsAfterAcceptByUser = {
        name: user.name,
        mobile: userCredential.mobile,
        image_url: user.image_url,
        vendor_id: booking.vendor_id,
        scheduled_date: booking.scheduled_date,
        scheduled_time: booking.scheduled_time,
        sub_category: subCategory.sub_category,
        address,
      };
      return { status: true, detailsAfterAcceptByUser };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const rejectByUser = async (user_id, rejected_vendor_id, booking_id) => {
  try {
    updObj = {
      status: "Rejected By User",
      vendor_id: null,
    };
    const rejectBookingRes = await con.booking.findOneAndUpdate(
      { _id: booking_id, user_id: user_id },
      updObj,
      { new: true }
    );
    if (rejectBookingRes) {
      let serviceNames = [];
      const serviceIds = await con.booking_service.find(
        { booking_id: rejectBookingRes._id },
        { service_id: 1 }
      );
      serviceIds.forEach(async (el) => {
        const bookService = await con.service.findOne(
          { _id: el.service_id },
          { service: 1 }
        );
        serviceNames.push({ service: bookService.service });
      });
      const userAddress = await con.address.findOne(
        { _id: rejectBookingRes.address_id, user_id: rejectBookingRes.user_id },
        { latitude: 1, longitude: 1 }
      );
      const bookSubCategory = await con.sub_category.findOne(
        { _id: rejectBookingRes.sub_category_id },
        { sub_category: 1, group_id: 1 }
      );
      // have to add data in notification table
      const detailsAfterRejectByUser = {
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
        sub_category: bookSubCategory.sub_category,
        services: serviceNames,
        scheduled_date: rejectBookingRes.scheduled_date,
        scheduled_time: rejectBookingRes.scheduled_time,
        description: rejectBookingRes.description,
        group_id: bookSubCategory.group_id,
        booking_id,
        rejected_vendor_id,
      };
      const vendorGrp = await con.vendor_group.find(
        { group_id: bookSubCategory.group_id, active: true, approved: true },
        { vendor_id: 1 }
      );
      if (vendorGrp.length > 0) {
        vendorGrp.forEach(async (el) => {
          const notificationObj = {
            notification_receiver_id: el.vendor_id,
            notification_detail: detailsAfterRejectByUser,
            booking_id,
          };
          const saveNotification = await con
            .notification(notificationObj)
            .save();
        });
      }
      return { status: true, detailsAfterRejectByUser };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const cancelByUser = async (user_id, booking_id) => {
  try {
    updObj = {
      status: "Cancelled By User",
    };
    const cancelBookingRes = await con.booking.findOneAndUpdate(
      { _id: booking_id, user_id: user_id },
      updObj,
      { new: true }
    );
    if (cancelBookingRes) {
      let serviceNames = [];
      const serviceIds = await con.booking_service.find(
        { booking_id: cancelBookingRes._id },
        { service_id: 1 }
      );
      serviceIds.forEach(async (el) => {
        const bookService = await con.service.findOne(
          { _id: el.service_id },
          { service: 1 }
        );
        serviceNames.push({ service: bookService.service });
      });
      const userAddress = await con.address.findOne(
        { _id: cancelBookingRes.address_id, user_id: cancelBookingRes.user_id },
        { latitude: 1, longitude: 1 }
      );
      const bookSubCategory = await con.sub_category.findOne(
        { _id: cancelBookingRes.sub_category_id },
        { sub_category: 1, group_id: 1 }
      );
      // have to add data in notification table
      const detailsAfterCancelByUser = {
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
        sub_category: bookSubCategory.sub_category,
        services: serviceNames,
        scheduled_date: rejectBookingRes.scheduled_date,
        scheduled_time: rejectBookingRes.scheduled_time,
        description: rejectBookingRes.description,
        booking_id,
        vendor_id: cancelBookingRes.vendor_id,
      };
      const notificationObj = {
        notification_receiver_id: cancelBookingRes.vendor_id,
        notification_detail: detailsAfterCancelByUser,
        booking_id,
      };
      const saveNotification = await con.notification(notificationObj).save();
      return { status: true, detailsAfterCancelByUser };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
//#endregion

//#region ---VENDOR SIDE EVENTs---
const acceptByVendor = async (vendor_id, booking_id) => {
  try {
    updObj = {
      status: "Accepted By Vendor",
      vendor_id: vendor_id,
    };
    const exist = await con.booking.exists({
      _id: booking_id,
      status: "Accepted By Vendor",
    });
    if (exist) return { status: "alreadyAccepted" };
    else {
      const acceptRes = await con.booking.updateOne(
        { _id: booking_id },
        updObj
      );
      if (acceptRes.ok) {
        const vendor = await con.vendor.findById(vendor_id);
        const user = await con.user.findById(vendor.user_id);
        const userCredential = await con.credential.findById(
          user.credential_id
        );
        const booking = await con.booking.findById(booking_id);
        const bookedServices = await con.booking_service.find(
          { booking_id: booking_id },
          { sub_category_id: 1, service_id: 1 }
        );
        const subCategory = await con.sub_category.findById(
          booking.sub_category_id
        );
        const detailsAfterAcceptByVendor = {
          name: user.name,
          mobile: userCredential.mobile,
          image_url: user.image_url,
          vendor_id,
          sub_category: subCategory.sub_category,
          scheduled_date: booking.scheduled_date,
          scheduled_time: booking.scheduled_time,
          user_id: booking.user_id,
        };
        const notificationObj = {
          notification_receiver_id: booking.user_id,
          notification_detail: detailsAfterAcceptByVendor,
          booking_id,
        };
        const saveNotification = await con.notification(notificationObj).save();
        return { status: true, detailsAfterAcceptByVendor };
      }
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
}

const vendorPlacedBid = async (data) => {
  try {
    const exist = await con.vendor_bid_on_booking.exists({ booking_id: data.booking_id, vendor_id: data.vendor_id })

    if (exist) return { status: "alreadyBidPlaced" }
    else {
      const saveBidRes = await con.vendor_bid_on_booking(data).save()
      if (saveBidRes) {
        const vendor = await con.vendor.findById(saveBidRes.vendor_id)
        const user = await con.user.findById(vendor.user_id)
        //const userCredential = await con.credential.findById(user.credential_id)
        const booking = await con.booking.findById(data.booking_id)
        const subCategory = await con.sub_category.findById(booking.sub_category_id)

        const detailsAfterPlacedBid = {
          vendor_image_url: user.image_url,
          vendor_id: data.vendor_id,
          sub_category: subCategory.sub_category,
          scheduled_date: booking.scheduled_date,
          scheduled_time: booking.scheduled_time,
          booking_id: data.booking_id
        }
        const notificationObj = {
          notification_receiver_id: booking.user_id,
          notification_detail: detailsAfterPlacedBid
        }
        const saveNotification = await con.notification(notificationObj).save()
        return { status: true, detailsAfterPlacedBid }
      }
    }
  } catch (error) {
    return { status: false, error: error.toString() }
  }
}

//#endregion

//#region ---Common---
const allBookingFor_Vendor_User = async (queryParams) => {
  try {
    let bookings = []
    let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
    let qry = {
      vendor_id: queryParams.vendor_id,
      user_id: queryParams.user_id,
      status: queryParams.status
    }
    if (queryParams.role.toLower() === 'vendor')
      delete qry.user_id
    else//user
      delete qry.vendor_id

    const booking = await con.booking.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
    if (booking.length > 0) {
      booking.forEach(async (el) => {
        let service_arr = []
        const sub_cate = await con.sub_category.findOne({ _id: el.sub_category_id }, { sub_category: 1, description: 1, amount: 1 })
        const address = await con.address.findOne({ _id: el.address_id }, { __v: 0 })
        const bookingServices = await con.booking_service.find({ booking_id: el._id }, { service_id: 1 })
        if (bookingServices.length > 0) {
          bookingServices.forEach(async (bs) => {
            const service = await con.service.findOne({ _id: bs.service_id }, { service: 1 })
            service_arr.push(service)
          })
        }
        let obj = {
          sub_category: sub_cate,
          address: address,
          services: service_arr
        }
        bookings.push(obj)
      })
    }
    const totalRecords = await con.booking.countDocuments(qry)
    return { status: true, record: { bookings, totalRecords, currentPage: queryParams.currentPage } }
    // leter has to use aggregate for above code
    // const vendorGrp = await con.sub_category.aggregate([
    //   { $match: { _id: booking.sub_category_id } },
    //   { $lookup: { from: 'Address', localField: 'user_id', foreignField: 'vendor_id', as: 'token' } },
    //   { $lookup: { from: 'Vendors', localField: 'user_id', foreignField: 'user_id', as: 'vendor' } },
    //   { $unwind: "$vendor" },
    //   { $lookup: { from: 'VendorGroups', localField: 'vendor.user_id', foreignField: 'vendor_id', as: 'vendorGroup' } },
    //   { $unwind: "$vendorGroup" },
    // ])
  } catch (error) {
    return { status: false, error: error.toString() }
  }
}

const praposalFor_Vendor_User = async (queryParams) => {
  try {
    let praposals = []
    let skipRecords = queryParams.pageSize * (queryParams.currentPage - 1)
    let qry = {booking_id: queryParams.booking_id}

    const VendorPraposals = await con.vendor_praposal_on_booking.find(qry, { __v: 0 }, { skip: skipRecords, limit: queryParams.pageSize }).sort({ _id: -1 })
    if (VendorPraposals.length > 0) {
      VendorPraposals.forEach(async (el) => {
        const vendor = await con.vendor.findOne({ _id: el.vendor_id }, { user_id: 1 })
        const user = await con.user.findOne({ _id: vendor.user_id }, { name: 1, image_url: 1 })
        let obj = {
          praposal_detail:el,
          vendor_detail:user
        }
        praposals.push(obj)
      })
    }
    const totalRecords = await con.vendor_praposal_on_booking.countDocuments(qry)
    return { status: true, record: { praposals, totalRecords, currentPage: queryParams.currentPage } }
  } catch (error) {
    return { status: false, error: error.toString() }
  }
}
//#endregion


module.exports = {
  //#region ---User---
  save,
  acceptByUser,
  rejectByUser,
  cancelByUser,
  //#endregion

  //#region ---Vendor---
  acceptByVendor,
  vendorPlacedBid,
  //#endregion

  //#region ---Common---
  allBookingFor_Vendor_User,
  praposalFor_Vendor_User,
  //#endregion
}
