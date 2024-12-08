const express = require('express')
const router = express.Router()

router.post('/', (req, res)=>{
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body;
    if (firstname && password) {
        res.status(200).json({ status: 'SUCCESS', message: 'User signed up!' });
    } else {
        res.status(400).json({ status: 'ERR', message: 'Invalid input' });
    }
})


module.exports = router