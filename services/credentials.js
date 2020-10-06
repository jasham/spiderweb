const con = require('../helper/db')

const save_credentials = async (data) => {
    try {
        const save_res = await new con.credentails(data).save()
        if(save_res){
            return save_res
        }
    }catch(error){
        console.log(error)
    }
}

const list_all_credentials = async () => {
    try {
        const credentials_list = await con.credentials.find({})
        
        if(credentials_list){
            return credentials_list
        }
    }catch(error){
        console.log(error)
    }
}

const list_specific_credential = async (id) => {
    try {
        const specific_credential = await con.credentails.findOne({_id:id})
        if(specific_credential){
            return  
        }else 
            return JSON.parse(JSON.stringify({status : "no service"}))
    }catch(error){
        console.log(error)
    }
}

const delete_specific_credential = async (id) => {
    console.log("Here is data",id)
    try {
        const del_credential = await con.crendetials.deleteOne({ _id: id })
        
        if(del_credential){
            console.log("Here is data",del_service)
            return del_credential
        }
    }catch(error){
        console.log("Here is error service_model delete id insuccessfull : " ,id)
    }
}

// const patch_specific_credential = async (req) => {
//     try {
//         const patch_service = await con.credentials.updateOne({ _id : req.params.id}, {service_name : req.body.service_name},function (err, docs) { 
//             if (err){ 
//                 console.log(err) 
//             } 
//             else{ 
//                 return docs
//             } 
//         })
//         if(patch_service){
//             return patch_service
//         }
//     }catch(error){
//         console.log("Here is error service_model delete id insuccessfull : " ,id)
//     }
// }

module.exports = { 
    save_credentials,
    list_all_credentials,
    list_specific_credential,
    delete_specific_credential
}


