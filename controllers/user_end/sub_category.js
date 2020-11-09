const sub_category = require('../../services/sub_category')
const router = require('express').Router()

const list_all_sub_category = (req, res) => {
    try {
        
        sub_category.listDetailedSubCategory().then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}


router.get('/', list_all_sub_category)

module.exports = router
