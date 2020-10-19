const con = require('../helper/db')
const pagining = require("../helper/pagination")
const { exists } = require('../models/user')

const save = async (data) => {
    try {
        let save_record = []
        let exist_category = []
        if(data.length > 0 ){
            let count = 0
            for (let i = 0; i < data.length; i++) {
                const exist = await con.category.exists({ category: data[i].category, deleted: false })
                if (exist){
                    exist_category.push({ category : data[i].category })
                }else{
                    const save_res = await new con.category(data[i]).save()     
                    save_record.push(save_res)
                }   
                count++;
            }
            if(count === data.length)
                return { status: true, save_record, exist_category }
        }
    }catch(error) {
        return { status: false, error: error.toString() }
    }
}

const list = async (queryParams) => {
    try {
        let list
        list = await pagining.getpagiantionData(con.category, queryParams)
        return list
        //list = await con.category.find({ deleted: false }, { __v: 0 }).sort({ _id: -1 })
        //return { status: true, list }

    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

const remove = async (id) => {
    try {
        const del_service = await con.category.updateOne({ _id: id }, { deleted: true, active: false })
        if (del_service.ok)
            return { status: true }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}

const update = async (data) => {
    try {
        if(data.length > 0 ){
            let count = 0;
            let flag = true 
            let exist_category = []
            let update_record = []
            for(let i = 0; i < data.length; i++){
                let updateObj = {
                    category: data[i].category,
                    rut: Date.now()
                }
                const exist = await con.category.exists({ category: data[i].category, deleted: false, _id : { $nin: data[i]._id } })
                if (exist){
                    exist_category.push({ category : data[i].category })
                    console.log("Here is exist cate",exist_category)
                }else{
                    const update_category = await con.category.findOneAndUpdate({ _id: data[i]._id }, updateObj, {new: true})
                    console.log("Here is updated vlue",update_category)
                    update_record.push(update_category)
                }   
                count++;
            }
            if(count===data.length){
                return { status : true, exist_category, update_record }
            }
        }
    }
    catch (error) {
        return { status: false, error: error.toString() }
    }
}


module.exports = {
    save,
    list,
    remove,
    update
}


