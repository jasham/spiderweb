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

const get_specific_category = (req, res) => {
    console.log("I am called")
    category.list(req.params.id).then(data => {
        console.log("Here is data", data)
        if (data)
            return res.status(200).send(data)
        else {
            result = 'fail'
            res.send()
        }
    })
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


router.post('/', add)
router.get('/', list_all_category)
router.get('/:id', get_specific_category)
router.post('/update/', update_specific_category)
router.post('/delete/', del_specific_category)


module.exports = router




