require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
console.log("AUTH", process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const send_otp = function (data) {
    return client.messages
        .create({
            body: data.message,
            from: '+19292955547',
            to: data.mobile
        })
        .then(message =>{
            console.log(message)
            return { status: true,  }
        } ).catch(err => {
            console.log("error: ", err)
            return {status: false}
        });
}
module.exports = {
    send_otp
}
