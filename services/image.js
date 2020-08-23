const con = require('../helper/db')

const save_image = async (data) => {
    try {
        const save_img = await new con.image(data).save()
        if(save_img){
            return save_img
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = { save_image }
