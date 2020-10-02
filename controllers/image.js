const image = require('../services/image')
const router = require('express').Router()



const add = (req, res) => {
    try {
        req.body.hostUrl=req.headers.host
        image.save(req.body).then(img_res => {
            if (img_res.status)
                return res.status(200).send({ result: 'success', data: img_res.imgObj })
            else
                return res.send({ result: 'fail', error: img_res.error, data: null })

        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

}

const list_all_image = (req, res) => {
    try {
        let result_data
        image.list().then(list => {
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

const get_specific_image = (req, res) => {

    image.get_specific_image(req.params.id).then(data => {
        if (data)
            return res.status(200).send(data)
        else {
            result = 'fail'
            res.send()
        }
    })
}

const del_specific_image = (req, res) => {
    try {
        image.remove(req.params.id).then(del_res => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }

}

const update_specific_image = (req, res) => {
    try {
        image.update(req.body).then(update_res => {
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
router.get('/', list_all_image)
router.get('/:id', get_specific_image)
router.put('/:id', update_specific_image)
router.delete('/:id', del_specific_image)


module.exports = router




