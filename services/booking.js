const con = require('../helper/db')

const save = async (data) => {
    try {
        let saved = []
        let exists = []
        let count = 0
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const exist = await con.category.exists({ category: data[i].category, deleted: false })
                if (exist) {
                    exists.push({ category: data[i].category })
                } else {
                    const save_res = await new con.category(data[i]).save()
                    saved.push(save_res)
                }
                count++
            }
        }
        //if (count === data.length)
        return { status: true, saved, exists }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

module.exports = {
    save
}