const router = require('express').Router()
const User = require('../models/user')
const CryptoJS = require('../node_modules/crypto-js');
const Credentials = require('../models/credentials');
const jwt = require('jsonwebtoken');

router.post('/register',async (req,res) => {
    if(!(req.body.name&&req.body.gender&&req.body.mobile&&req.body.password&&req.body.email)){
        return res.status(400).json({
            success:false,
            message:'bad request'
        });
    }
    let name= req.body.name;
    let dob= req.body.dob;
    let gender= req.body.gender;
    let mobile= req.body.mobile;
    let password= req.body.password;
    let email= req.body.email;
    
    //Encrypt
    let cryptPassword = CryptoJS.AES.encrypt(password, 'secret key 776').toString();
    console.log("11111", cryptPassword);

    const user = new User({
        name : name,
        dob :dob,
        gender : gender,
        mobile: mobile,
        email :email
    });
    const credential = new Credentials({
        email:email,
        password:cryptPassword
    });
    try{
        const savedUser = await user.save()
        console.log("999", savedUser);
        if(savedUser){
            credential.user_id = savedUser._id
            console.log("@@@",credential);
            const savedCredential = await credential.save()
            res.status(200).json({
                success:true,
                message:'register successful',
                data: savedUser,
                action: "userAndCredentialRegister"
            });
        }else{
            return res.status(500).json({
                success:false,
                message:'Try Again Later',
                action: "userAndCredentialRegister"
            });
        }
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            action:'userRegister',
            error:err
        })
    }
});

router.post('/login',async (req,res) => {
    if(!(req.body.email&&req.body.password)){
        return res.status(400).json({
            success:false,
            message:'bad request'
        });
    }
    let email=req.body.email;
    let password=req.body.password
    Credentials.findOne({email:email}, (err, dbRes)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:'something went wrong',
                action:'UserLogin',
            });
        }
        if(dbRes){
            let cryptPassword = dbRes.password;
            let bytes  = CryptoJS.AES.decrypt(cryptPassword, 'secret key 776');
            let dcrypPassword = bytes.toString(CryptoJS.enc.Utf8);
            if(password == dcrypPassword){
                let token = jwt.sign(
                    {
                        email:dbRes.email,
                        userId:dbRes.user_id
                    }, 
                    'spiderWebMaker', 
                    {
                        expiresIn:'1h'
                    }
                );
                console.log('******', token);
                return res.status(200).json({
                    success:true,
                    message:'user matched',
                    action:'UserLogin',
                    data:dbRes,
                    token:token
                });
            }else{
                return res.status(200).json({
                    success:true,
                    message:'email or password not matched',
                    action:'UserLogin',
                });
            }
        }else{
            return res.status(200).json({
                success:true,
                message:'email or password not matched',
                action:'UserLogin',
            });
        }
    });    
});


module.exports = router