const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,enum:["Business","Tech","Lifestyle","Entertainment"],required:true},
    date:{type:Date,required:true},
    likes:{type:Number},
    comments:[{username:String,content:String}]

})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports={BlogModel}