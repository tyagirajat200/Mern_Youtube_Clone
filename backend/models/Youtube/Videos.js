var mongoose=require('mongoose')

var schema =new  mongoose.Schema({
    
    filePath:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    privacy: {
        type: Number,
    },
    category:{
        type:String
    },
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    },
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

var Video= new mongoose.model('Video', schema)

module.exports=Video