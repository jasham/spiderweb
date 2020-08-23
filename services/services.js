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
        if(specific_service)
            return specific_service
    }catch(error){
        console.log(error)
    }
}

module.exports = { 
    save_service,
    list_all_services,
    list_specific_services
}

