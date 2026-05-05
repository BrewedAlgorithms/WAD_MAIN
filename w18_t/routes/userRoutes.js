const express = require("express");
const router = express.Router();
const User = require('../models/userModel.js');

router.get('/insert', (req, res) => {
    User.insertMany([
    {
        uname: "durgesh", uemail: "d@1.com", upass: "1"
    },
    {
        uname: "durgesh2", uemail: "d@2.com", upass: "2"
    },
]);

res.send("Inserted!");
});

router.get('/data', async (req, res) => {

    let data = await User.find();
    res.json({"data":data});

});

router.get('/updatetoABC/:uname', async (req, res) => {

    await User.updateOne(
        {uname: req.params.uname},
        {
            $set: {
                uname: "ABC"
            }
        }
    );

    res.send("done");

});

module.exports = router;