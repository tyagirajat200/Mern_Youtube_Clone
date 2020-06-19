var express = require('express')
var router = express.Router()
var Video = require('../../models/Youtube/Videos')
const {authChecker}= require('../../middleware/Auth')
var multer = require('multer')
var path = require('path')

var ffmpeg = require('fluent-ffmpeg')
var ffmpeg_static = require("ffmpeg-static")
var ffprobe_static = require('ffprobe-static')
var Subscriber = require('../../models/Youtube/Subscriber')


ffmpeg.setFfmpegPath(ffmpeg_static)
ffmpeg.setFfprobePath(ffprobe_static.path)




var Storage = multer.diskStorage({
  destination: '../Uploads/',
  
  filename: (req, file, cb) => {

    cb(null, file.originalname.split('.')[0] +"_" +Date.now() + "_" + path.extname(file.originalname));
  },

})


const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)
  if (file.mimetype === "video/mp4")

   {
    cb(null, true);
  } else {
    req.fileValidationError = 'Only Video files are allowed!';
    cb(new Error("File format should mp4"), false); // if validation failed then generate error
  }
};


var upload = multer({
  storage: Storage,
  fileFilter: fileFilter
}).single('file');


router.post('/upload', (req, res) => {
  
  upload(req, res, err => {
    
    
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    else if (!req.file) {
      return res.status(400).json({ error: 'Please select an video to upload' });
    }
    else if (err instanceof multer.MulterError) {
      return res.status(400).json(err);
    }
    else if (err) {
      return res.status(400).json(err);
    }

    const user=req.session.user.id
    console.log(req.body);
    
    const { title, desc, privacy, category} = req.body


    if (!title || !desc) {
      return res.status(400).json({ error: "Please fill all fields" });

    }
    let thumbsFilePath = "";
    let fileDuration = "";
    

    ffmpeg.ffprobe(req.file.path, function (err, metadata) {
      console.log(metadata.format.duration);
      fileDuration = metadata.format.duration;
    })


    ffmpeg(req.file.path)
      .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        thumbsFilePath = "../Uploads/thumbnails/" + filenames[0];
      })
      .on('end', function () {
        console.log('Screenshots taken');

        var video = new Video({
          title: title,
          description: desc,
          privacy: privacy,
          category: category,
          filePath: req.file.path,
          duration: fileDuration,
          thumbnail: thumbsFilePath,
          writer:user
        })

        video.save(err => {
          if (!err) res.json({ msg: "Video Uploaded" })
        })
        
      })
      .screenshots({

        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        folder: '../Uploads/thumbnails',
        size: '320x240',

        // %b input basename ( filename w/o extension )
        filename: 'thumbnail-%b.png'
      });


  })
})


router.get("/getAllVideos", (req, res) => {

  Video.find()
      .populate('writer')
      .exec((err, videos) => {
          if(err) return res.status(400).send(err);
          res.json({ success: true, videos })
      })

});

router.post("/getVideo", (req, res) => {
  console.log(req.body.videoId);
  
    Video.findOneAndUpdate({ "_id" : req.body.videoId },{ $inc: { views: 1 }},{new:true})
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.json({ success: true, video })
    })
})


router.get('/getSubscriptionVideos',(req,res)=>{
  var user = req.session.user
  Subscriber.find({ 'SubsBy': user.id})
    .populate('SubsTo')
    .exec((err, subscribers)=> {
      console.log(subscribers);
      
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.SubsTo)
        })


        //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true,subscribedUser,videos})
            })
    })
})



module.exports = router