const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://tyagiapp:tyagiapp@cluster0-3fzth.mongodb.net/try?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var con=mongoose.connection;

con.on("connected",()=>{
    console.log("connected succesfully");
})
con.on("disconnected",()=>{
    console.log("disconnected succesfully");
})
con.on('error',()=> console.log("Database not connected internet problem"));

var schema=new mongoose.Schema({
    SubsTo:String,
    SubsBY:String,
    User:[{
        type:String 
    }]
})

var model=new mongoose.model('Try',schema)


// update only one fied remain same
// model.findOneAndUpdate({_id:"5ee5ddc78a327c0b7044cd64"},{SubsTo:"dwjfh"},{new:true}).exec((err,data)=>{
//     console.log(data);
// })



//update only one fied in array same for object use . to achieve
// model.findOneAndUpdate({_id:"5ee5ddc78a327c0b7044cd64"},{$set:{"User.1":"dongaya"}},{new:true}).exec((err,data)=>{
//     console.log(data);
// })




// push multiple values   we can not pull this way

// model.findOneAndUpdate({_id:"5ee5ddc78a327c0b7044cd64"},{$push:{User:["rajat","tyagi","golu"]}},{new:true})
// .exec((err,data)=>{
//     console.log(data) 
// })





// model.findOneAndUpdate({_id:"5ee5ddc78a327c0b7044cd64"},{$pull:{User:"don"}},{new:true})
//     .exec((err,data)=>{
//         console.log(data) 
//     })



   

// var data=new model({
//     SubsTo:"Golu",
//     SubsBY:"Rajat Tyagi"
// })

// data.save((err,res)=>{
// console.log(res);

// })




// User to and User BY  OR   
// model.find( {$or: [{SubsTo:"Rajat Tyagi",SubsBY:"Golu"},{SubsTo:"Golu",SubsBY:"Rajat Tyagi"}]})      
//     .exec((err,res)=>{
//         console.log(res.length)  
//     })



            // behaves as and
// model.find({SubsTo:"Rajat Tyagi",SubsBY:"Babu"})          
//     .exec((err,res)=>{
//         console.log(res);
        
//     })




//      To find mutiple users
// model.find( {$or: [{SubsTo:"Rajat Tyagi"},{SubsBY:"Rajat Tyagi"}]})      
//     .exec((err,res)=>{
//         console.log(res.length)  
//     })





// model.find({})
// //.populate('created_By',{'password':0, '_id':0 , 'date':0, '__v':0})
//          // or select can be select("title message -_id")
// .exec((error,data)=>{
// console.log(data)

// })