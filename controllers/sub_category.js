const sub_category = require('../services/sub_category')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')
//const { sub_categoryValidationRules } = require('../helper/model_validator/sub_category_validator')


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
        let result_data
        sub_category.list(req.params.cat_id).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.list })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

    // req.app.io.emit('notify_me','hello')
    // global.io.sockets.in(global.users[1].userId).emit('notify_me', 'I am from user 1');
}

const get_specific_sub_category = (req, res) => {

    sub_category.get_specific_sub_category(req.params.id).then(data => {
        if (data)
            return res.status(200).send(data)
        else {
            result = 'fail'
            res.send()
        }
    })
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
    try {
        sub_category.update(req.body).then(update_res => {
            if (update_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: update_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}


router.post('/', add)
router.get('/:cat_id', list_all_sub_category)
router.get('/:id', get_specific_sub_category)
router.put('/:id', update_specific_sub_category)
router.delete('/:id', del_specific_sub_category)

module.exports = router




