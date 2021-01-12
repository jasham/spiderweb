const category = require('../services/category')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')
const { categoryValidationRules } = require('../helper/model_validator/category_validator')


const add = (req, res) => {
    try {
        category.save(req.body).then(save_res => {
            if (save_res.status)
                return res.status(200).send({
                    result: 'success',
                    data: {
                        save_category: save_res.saved,
                        exist_category: save_res.exists
                    }
                })
            else
                return res.send({ result: 'fail', error: save_res.error, data: null })

        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

}

const list_all_category = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        category.list(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

    // req.app.io.emit('notify_me','hello')
    // global.io.sockets.in(global.users[1].userId).emit('notify_me', 'I am from user 1');
}

const del_specific_category = (req, res) => {
    try {
        category.remove(req.body).then(del_res => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const update_specific_category = (req, res) => {
    try {
        category.update(req.body).then(update_res => {
            if (update_res.status)
                return res.status(200).send({
                    result: 'success',
                    data: {
                        exist_category: update_res.exists,
                        update_category: update_res.updated
                    }
                })
            else
                return res.status(200).send({ result: 'fail', error: update_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const active = async (req, res) => {
    try {
        category.active(req.params.id,req.params.status).then(update_status => {
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
        req.body.hostUrl = req.protocol + '://' + req.get('host')
        req.body.repository = 'images'
        category.categoryImage(req.body).then(img_res => {
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
        console.log("Here is query params",queryParams)

        category.listImage(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const del_category_image = (req, res) => {
    try {
        category.deleteImage(req.params.id).then(del_res => {
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
    console.log("Get in to image category",req.params)
    try {
        category.activeImage(req.params.id,req.params.category_id,req.params.image,req.params.type, req.params.status).then(status => {
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
router.get('/', list_all_category)
router.post('/update', update_specific_category)
router.post('/delete', del_specific_category)
router.get('/active/:id/:status', active)
router.post('/category_image', upload_image)
router.get('/category_image', list_image)
router.delete('/category_image/:id', del_category_image)
router.get('/category_image/active/:id/:category_id/:image/:type/:status', active_image)


module.exports = router




