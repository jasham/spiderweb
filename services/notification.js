const con = require('../helper/db')

const save = async (data) => {
    try {
        const saveRes = await con.notification(data).save()
        if (saveRes)
            return { status: true, saveRes }
        return { status: false, error: 'something wrong to save data in notification' }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

module.exports = {
    save
}