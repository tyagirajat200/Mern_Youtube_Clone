const express = require('express');
const router = express.Router();

const Subscriber = require("../../models/Youtube/Subscriber");

// const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================


router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({ SubsTo: req.body.SubsTo })
                .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
    })

});



router.post("/IsSubscribed", (req, res) => {

    const user=req.session.user
    Subscriber.find({ SubsTo: req.body.SubsTo , SubsBy: user.id })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(subscribe.length !== 0) {
            result = true
        }

        res.json({ success: true, IsSubcribed: result  })
    })

});



router.post("/subscribe", (req, res) => {

    const user=req.session.user
    const subscribe = new Subscriber({
       
        SubsTo:req.body.SubsTo,
        SubsBy:user.id,
    });

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/unSubscribe", (req, res) => {

    const user=req.session.user

    Subscriber.findOneAndDelete({ SubsTo: req.body.SubsTo, SubsBy: user.id })
        .exec((err, doc)=>{
           
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});



module.exports = router;