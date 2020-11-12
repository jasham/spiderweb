const sub_category = require('../services/sub_category')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')


const add = (req, res) => {
    try {
        sub_category.save(req.body).then(save_res => {
            if (save_res.status === 'exist')
                return res.status(200).send({ result: 'subCategoryExist' })
            else if (save_res.status)
                return res.status(200).send({ result: 'success', data: save_res.save_sub_cat })
            else
                return res.send({ result: 'fail', error: save_res.error, data: null })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const list_all_sub_category = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        sub_category.list(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const del_specific_sub_category = (req, res) => {
    try {
        sub_category.remove(req.params.id).then(del_res => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }

}

const update_specific_sub_category = (req, res) => {
    //req.body.id = req.params.id
    try {
        sub_category.update(req.body).then(update_res => {
            if (update_res.status === 'exist')
                return res.status(200).send({ result: 'subCategoryExist' })
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
        sub_category.active(req.params.id,req.params.status).then(update_status => {
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

const upload_image = (req, res) => {
    try {
        rreq.body.hostUrl = req.protocol + '://' + req.get('host')
        req.body.repository = 'images'
        sub_category.subCategoryImage(req.body).then(img_res => {
            if (img_res.status)
                return res.status(200).send({ result: 'success', data: img_res.imgObj })
            else
                return res.send({ result: 'fail', error: img_res.error, data: null })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const list_image = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)

        sub_category.listImage(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const del_sub_category_image = (req, res) => {
    try {
        sub_category.deleteImage(req.params.id).then(del_res => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }

}

const active_image = async (req, res) => {
    try {
        sub_category.activeImage(req.params.id,req.params.sub_category_id,req.params.image,req.params.type).then(status => {
            if (status.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: status.error })
        })
    }
    catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}


router.post('/', add)
router.get('/', list_all_sub_category)
router.put('/', update_specific_sub_category)
router.delete('/:id', del_specific_sub_category)
router.get('/active/:id/:status', active)
router.post('/sub_category_image', upload_image)
router.get('/sub_category_image', list_image)
router.delete('/sub_category_image/:id',del_sub_category_image)
router.get('/sub_category_image/active/:id/:sub_category_id/:image/:type', active_image)

module.exports = router




