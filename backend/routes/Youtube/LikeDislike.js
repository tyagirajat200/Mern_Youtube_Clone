const express = require('express');
const router = express.Router();
const Video = require('../../models/Youtube/Videos')


//=================================
//             Likes DisLikes
//=================================


router.put('/onlike', (req, res) => {
    var user = req.session.user

    Video.findOneAndUpdate({ _id: req.body.vedioId }, { $addToSet: { likes: user.id } }, { new: true })
        .exec((err, data) => {
            if (err) return res.status(400).json(err)
            Video.findOneAndUpdate({ "_id": req.body.vedioId }, { $pull: { dislikes: user.id } }, { new: true })
                .exec((err, data) => {
                    if (err) return res.status(400).json(err)
                    console.log(data);
                    res.json({ success: true, liked: true })
                })

        })
})


router.put('/ondislike', (req, res) => {
    var user = req.session.user
    Video.findOneAndUpdate({ "_id": req.body.vedioId }, { $addToSet: { dislikes: user.id } }, { new: true })
        .exec((err, data) => {
            if (err) return res.status(400).json(err)
            Video.findOneAndUpdate({ "_id": req.body.vedioId }, { $pull: { likes: user.id } }, { new: true })
                .exec((err, data) => {
                    if (err) return res.status(400).json(err)
                    console.log(data);
                    res.json({ success: true, disliked: true })
                })
        })
})


router.put('/unlike',(req,res)=>{
    var user=req.session.user
    Video.findOneAndUpdate({"_id":req.body.vedioId},{$pull:{likes:user.id}} ,{ new:true})
    .exec((err,data)=>{
        if(err) return res.status(400).json(err)
        res.json({success:true,liked:false})
    })
})




router.put('/undislike', (req, res) => {
    console.log(req.body)
    var user = req.session.user
    Video.findOneAndUpdate({ "_id": req.body.vedioId }, { $pull: { dislikes: user.id } }, { new: true })
        .exec((err, data) => {
            if (err) return res.status(400).json(err)
            console.log(data);
            res.json({ success: true, disliked: false })
        })
})


module.exports = router