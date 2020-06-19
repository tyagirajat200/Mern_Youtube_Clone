const express = require('express');
const router = express.Router();
const Comment = require("../../models/Youtube/Comment");

//const { auth } = require("../middleware/auth");

//=================================
//             Comment
//=================================


router.post("/saveComment", (req, res) => {

    req.body.writer=req.session.user.id
    const comment = new Comment(req.body)
    
   
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, comment) => {
                if (err) return res.status(400).json({ success: false, err })
             
                res.json({ success: true, comment })
            })
    })

})

router.post("/getComments",(req, res) => {

    console.log(req.body);
    
    Comment.find({ videoId: req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).json(err)
            res.status(200).json({ success: true, comments })
        })
});




module.exports = router;