var mongoose = require('mongoose')

var schema=new mongoose.Schema({

    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        required:true
    },
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
       type:String,
       required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

var Comment= new mongoose.model('Comment', schema)

module.exports=Comment