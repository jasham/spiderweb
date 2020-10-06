const con = require('../helper/db')
const user = con.user
const credentails = con.credentails

const sign_up_vendor = async (data) => {
    try {
        
        
    }catch(error){
        console.log(error)
    }
}

const sign_up_user = async (data) => {
    try {
        // checking email exist or not
        const exist = await credentails.findOne({ email : data.email })
        if(!exist){
            const userInfo = {
                name : data.name
            }
            const save_res = await new user(userInfo).save()
            if(save_res){
                try{
                    credentialInfo = {
                        user_id : save_res._id,
                        password : data.password,
                        email : data.email
                    }
                    const saved_credentials = await new credentails(credentialInfo).save()
                    console.log("User saved successfully",saved_credentials)
                }catch(error){
                    
                }
                return save_res
            }
        }else{
            return { msg : "email already exist !!!"}
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = { 
    sign_up_user
}
