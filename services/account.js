const con = require('../helper/db')
const auth = require('../helper/auth')
const uuid = require('uuid')

signup = async (data) => {
    try {
        let recordExist
        if (data.email) {
            recordExist = await con.credential.exists({ email: data.email, deleted: false })
            if (recordExist)
                return { status: "emailExist" }
        }
        if (data.mobile) {
            recordExist = await con.credential.exists({ mobile: data.mobile, deleted: false })
            if (recordExist)
                return { status: "mobileExist" }
        }

        data.uid = uuid.v4()
        let user = {}
        const saveCredential = await con.credential(data).save()
        data.credential_id = saveCredential._id
        const saveUser = await new con.user(data).save()

        if (saveUser !== undefined) {
            if (data.role_id === 2) {// only for vendor
                let vObj = {
                    status: 'Available',
                    user_id: saveUser._id
                }
                const saveVendor = await new con.vendor(vObj).save()
                user["vendor_status"] = saveVendor.status
                user["vendor_isActive"] = saveVendor.active
                user["vendor_id"] = saveVendor._id
            }
            let tokenObj = {
                _id: saveUser._id,
                uid: saveCredential.uid
            }
            var token = await auth.signup(tokenObj)
            user["user_id"] = saveUser._id
            user["credential_id"] = saveCredential._id
            user["email"] = saveCredential.email
            user["mobile"] = saveCredential.mobile
            user["name"] = saveUser.name
            user["image_url"] = saveUser.image_url
            user["credential_isActive"] = saveCredential.active
            user["role_id"] = saveUser.role_id
            user["uid"] = saveCredential.uid
            user["token"] = token
        }
        return { status: true, user }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

login = async (data) => {
    try {
        var emailOrMobileExist, pwdExist, loginObj
        if (data.emailOrMobile.includes('@')) {
            emailOrMobileExist = await con.credential.exists({ email: data.emailOrMobile, deleted: false })
            if (emailOrMobileExist) {
                pwdExist = await con.credential.exists({ password: data.password, deleted: false })
                if (pwdExist) {
                    loginObj = {
                        email: data.emailOrMobile,
                        password: data.password
                    }
                    const loginResult = loginUserRecord(loginObj)
                    return loginResult
                }
                else
                    return { status: 'wrongPassword' }
            }
            else
                return { status: 'wrongEmail' }
        }
        else {
            emailOrMobileExist = await con.credential.exists({ mobile: data.emailOrMobile, deleted: false })
            if (emailOrMobileExist) {
                pwdExist = await con.credential.exists({ password: data.password, deleted: false })
                if (pwdExist) {
                    loginObj = {
                        mobile: data.emailOrMobile,
                        password: data.password
                    }
                    const loginResult = loginUserRecord(loginObj)
                    return loginResult
                }
                else
                    return { status: 'wrongPassword' }
            }
            else
                return { status: 'wrongMobile' }
        }
    } catch (error) {
        return { status: false, error: error.toString() }
    }
}

loginUserRecord = async (loginObj) => {
    try {
        const getCredential = await con.credential.findOne(loginObj)
        const getUser = await con.user.findOne({ credential_id: getCredential._id })
        var user = {}
        let vendorServices = []
        if (getUser.role_id === 2) {// only for vendor
            const getVendor = await con.vendor.findOne({ user_id: getUser._id })
            const getVendorGrps = await con.vendor_group.find({ vendor_id: getVendor._id, deleted: false, active: true })
            getVendorGrps.forEach(async el => {
                const getGrp = await con.group.findOne({ _id: el.group_id, deleted: false, active: true }, { group_name: 1 })
                let obj = {
                    group_name: getGrp.group_name,
                    group_id: el.group_id
                }
                vendorServices.push(obj)
            })
            const vendor = await con.vendor.findOne({ user_id: getUser._id })
            user["vendor_status"] = vendor.status
            user["vendor_isActive"] = vendor.active
            user["vendor_id"] = vendor._id
            user["services"] = vendorServices
        }
        let tokenObj = {
            _id: getUser._id,
            uid: getCredential.uid
        }
        var token = await auth.login(tokenObj)
        user["user_id"] = getUser._id
        user["credential_id"] = getCredential._id
        user["email"] = getCredential.email
        user["mobile"] = getCredential.mobile
        user["name"] = getUser.name
        user["credential_isActive"] = getCredential.active
        user["image_url"] = getUser.image_url
        user["uid"] = getCredential.uid
        user["role_id"] = getUser.role_id
        user["token"] = token

        return { status: true, user }
    } catch (error) {
        return { status: false, error: error.toString() }
    }

}

module.exports = {
    signup,
    login
}