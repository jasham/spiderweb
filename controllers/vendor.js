const { response } = require('express')
const vendor = require('../services/vendor')
const router = require('express').Router()


const add = (req, res) => {
    console.log("Here is reached add")
    try {
        vendor.save(req.body).then(save_res => {
            if (save_res.status === 'exist')
                return res.status(200).send({ result: 'subCatGroupExist' })
            else if (save_res.status)
                return res.status(200).send({ result: 'success', data: save_res.save_ved_grp })
            else
                return res.send({ result: 'fail', error: save_res.error, data: null })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const list_all_sub_cat_grp = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        console.log("Here is query params", queryParams)
        vendor.list(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const del_specific_sub_cat_grp = (req, res) => {
    try {
        vendor.remove(req.params.id).then(del_res => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }

}

const update_specific_sub_cat_grp = (req, res) => {
    try {
        vendor.update(req.body).then(update_res => {
            if (update_res.status === 'exist')
                return res.status(200).send({ result: 'subCatGroupExist' })
            else if (update_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: update_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const active = async (req, res) => {
    try {
        vendor.active(req.params.id, req.params.status).then(update_status => {
            if (update_status.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: update_status.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const list_all_grp = async (req, res) => {
    try {
        vendor.list_sub_cat_grp().then(grp => {
            if (grp.status)
                return res.status(200).send({ result: 'success', data: grp.vendor_sub_category })
            else
                return res.status(200).send({ result: 'fail', error: grp.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const active_vendor = async (req, res) => {
    try {
        vendor.active_vendor(req.params.id, req.params.status).then(update_status => {
            if (update_status.status)
                return res.status(200).send({ result: 'success', status_object: update_status.updateObj })
            else
                return res.status(200).send({ result: 'fail', error: update_status.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const generate_otp = async (req, res) => {
    try {
        vendor.generate_otp(req.body).then(response => {
            if (response.status)
                return res.status(200).send({ result: response.message })
            else
                return res.status(200).send({ result: 'fail', error: response.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const verify_otp_update_mobile = async (req, res) => {
    try {
        vendor.verify_otp_update_mobile(req.body).then(response => {
            if (response.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: response.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}



router.post('/', add)
router.get('/', list_all_sub_cat_grp)
router.put('/', update_specific_sub_cat_grp)
router.delete('/:id', del_specific_sub_cat_grp)
router.get('/active/:id/:status', active)
router.get('/service_group', list_all_grp)
router.patch('/vendor_status/:id/:status', active_vendor)
router.post('/send_otp', generate_otp)
router.patch('/update_mobile', verify_otp_update_mobile)



module.exports = router




