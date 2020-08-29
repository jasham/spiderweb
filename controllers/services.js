const multer  = require('multer')
const path = require('path')
const router = require('express').Router()
const service = require('../services/services')
const image = require('../services/image')
const { validate } = require('../helper/model_validator')
const { serviceValidationRules } = require('../helper/model_validator/service_mod')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

add = (req, res) => {
    service.save_service(req.body).then(save_res => {
        let image_obj = {
            image : req.file.path,
            service_id : save_res.id
        }
        console.log("Here is save res",save_res,req.file.path)
        image.save_image(image_obj)
        if (save_res)
            return res.status(200).send(save_res)
        else{
            result = 'fail'
            res.send()
        }
    })
}

list_all = (req,res) => {
    service.list_all_services().then((data) => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

specific_list = (req,res) => {
    // console.log("Here is request specific",req.params.id)
    service.list_specific_services(req.params.id).then((data) => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

specific_list_patch = (req,res) => {
    service.patch_specific_services(req).then((data) => {
        console.log("Teja tejavini",data)

        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

specific_list_patch = (req,res) => {
    service.patch_specific_services(req).then((data) => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}


specific_list_delete = (req,res) => {
    service.delete_specific_services(req.params.id).then((data) => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

router.post('/',upload.single('image'), validate(serviceValidationRules), add)
router.get('/', list_all)
router.get('/:id',specific_list)
router.patch('/:id',specific_list_patch)
router.delete('/:id',specific_list_delete)

module.exports = router

