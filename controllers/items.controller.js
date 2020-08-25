// WORK LATER

// const multer  = require('multer')
// const path = require('path')
// const router = require('express').Router()
// const service = require('../services/services')
// const image = require('../services/image')
// const { validate } = require('../helper/model_validator')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });


// router.post('/',upload.single('image'), validate(serviceValidationRules), add)
// router.get('/', list_all)
// router.get('/:id',specific_list)

// module.exports = router