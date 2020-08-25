const router = require('express').Router()
const bookingService = require('../services/bookings.services')
const { validate } = require('../helper/model_validator')
const {bookingsValidationRules} = require('../helper/model_validator/bookings.validation')
const {authenticator} = require('../middlewares/authenticator')


addBooking = (req, res)=>{
    bookingService.saveBookings(req.body).then(save_res=>{
        if (save_res){
            return res.status(200).json({
                success:true,
                message:"Booking Successful",
                action: "addBooking"
            });
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong",
                action: "addBooking"
            });
        }
    })
}

listAllBookings = (req, res)=>{
    bookingService.listBookings().then(data=>{
        if(data.length>0){
            let user = {}
            user.email = req.auth.email
            user.userId = req.auth.userId
            return res.status(200).json({
                success:true,
                message:"List of all bookings",
                data : {data, user},
                action: 'listAllBookings'
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"No Booking found",
                action: 'listAllBookings'
            });
        }
        
    })
}

getSpecificBooking = (req, res)=>{
    let user_id = req.query.id
    if(!user_id){
        return res.status(400).json({
            success:false,
            message:'missing params',
            action: "getSpecificBooking"
        })
    }
    bookingService.listSpecificBooking(user_id).then(data=>{
        if(data.length>0){
            return res.status(200).json({
                success:true,
                message: "Booking of specicific User",
                data: data,
                action: 'getSpecificBooking'
            });
        }else{
            return res.status(200).json({
                success:true,
                message:'No Booking found',
                action: 'getSpecificBooking'
            });
        }
        
    })
}

deleteBooking = (req, res)=>{
    let user_id = req.body.user_id;
    let service_id = req.body.service_id;
    if(!(user_id && service_id)){
        return res.status(400).json({
            success:false,
            message:'Missing Params',
            action: 'deleteBooking'
        });
    }
    let data = {
        user_id:user_id,
        service_id:service_id
    }
    console.log('00000', data)
    bookingService.deleteBooking(data).then(response=>{
        console.log(response);
    })
}

router.post('/', validate(bookingsValidationRules), addBooking);


router.get('/', authenticator, listAllBookings);
router.get('/specific', authenticator, getSpecificBooking);
router.patch('/delete', authenticator, deleteBooking);

module.exports = router
