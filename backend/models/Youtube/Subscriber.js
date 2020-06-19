var mongoose = require('mongoose')

var schema=new mongoose.Schema({

    SubsTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    SubsBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

schema.index({"SubsTo":1,"SubsBy":1},{unique:true})

var Subscriber= new mongoose.model('Subscriber', schema)

module.exports=Subscriber