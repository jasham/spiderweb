const con = require('../helper/db')

const save_service = async (data) => {
    try {
        const save_res = await new con.service(data).save()
        if(save_res){
            return save_res
        }
    }catch(error){
        console.log(error)
    }
}

const list_all_services = async () => {
    try {
        const service_list = await con.service.find({})
        
        if(service_list){
            return service_list
        }
    }catch(error){
        console.log(error)
    }
}

const list_specific_services = async (id) => {
    try {
        const specific_service = await con.service.findOne({_id:id})
        console.log("Here is data hand",specific_service)
        if(specific_service){
            return  
        }else 
            return JSON.parse(JSON.stringify({status : "no service"}))
    }catch(error){
        console.log(error)
    }
}

const delete_specific_services = async (id) => {
    console.log("Here is data",id)
    try {
        const del_service = await con.service.deleteOne({ _id: id })
        
        if(del_service){
            console.log("Here is data",del_service)
            return del_service
        }
    }catch(error){
        console.log("Here is error service_model delete id insuccessfull : " ,id)
    }
}

const patch_specific_services = async (req) => {
    try {
        const patch_service = await con.service.updateOne({ _id : req.params.id}, {service_name : req.body.service_name},function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                return docs
            } 
        })
        if(patch_service){
            return patch_service
        }
    }catch(error){
        console.log("Here is error service_model delete id insuccessfull : " ,id)
    }
}

module.exports = { 
    save_service,
    list_all_services,
    list_specific_services,
    delete_specific_services,
    patch_specific_services
}

