const con = require('../helper/db')

const save_category = async (data) => {
    try {
        const save_res = await new con.category(data).save()
            console.log("Ginger 2",save_res)
            return save_res
    }catch(error){
        console.log("Ginger 1",error)
        return error
    }
}

const list_all_category = async () => {
    try {
        const category_list = await con.category.find({})
        
        if(category_list){
            return category_list
        }
    }catch(error){
        console.log(error)
    }
}

const list_specific_category = async (id) => {
    try {
        const specific_category = await con.category.findOne({_id:id})
        if(specific_category){
            return  
        }else 
            return JSON.parse(JSON.stringify({status : "no service"}))
    }catch(error){
        console.log(error)
    }
}

const delete_specific_category = async (id) => {
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

const patch_specific_category = async (req) => {
    try {
        let categoryData = {
            category_name : req.body.category_name
        }
        const patch_category = await con.category.updateOne({ _id : req.params.id}, categoryData ,function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                return docs
            } 
        })
        if(patch_category){
            return patch_category
        }
    }catch(error){
        console.log("Here is error service_model delete id insuccessfull : " ,id)
    }
}


module.exports = {
    save_category,
    list_all_category,
    list_specific_category,
    delete_specific_category,
    patch_specific_category
}


