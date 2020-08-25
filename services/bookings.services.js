const Bookings = require('../models/bookings');

exports.saveBookings = async (data) => {
    try {
        const save_res = await new Bookings(data).save()
        if(save_res){
            return save_res
        }
    }catch(error){
        console.log(error)
    }
}

exports.listBookings = async () => {
    try {
        const bookingList = await Bookings.find({isActive:true}, {isActive:0, __v:0})
        
        if(bookingList){
            return bookingList
        }
    }catch(error){
        console.log(error)
    }
}

exports.listSpecificBooking = async (user_id) =>{
    try{
        const bookingList = await Bookings.find({user_id : user_id, isActive:true}, {__v:0})
        if(bookingList){
            return bookingList
        }
    }catch(e){
        console.log(e);
    }
}

exports.deleteBooking = async (data) =>{
    try {
        console.log('33333', data);
        const deleted = await Bookings.findOneAndUpdate(data, {isActive:false})
        console.log('11111', deleted);
    } catch (error) {
        console.log(error);
    }
}