const express=require("express");

const {BlogModel}=require("../model/blogModel")

const blogRoute=express.Router();

blogRoute.post('/',async(req,res)=>{
    try{
        const {username,title,content,category,date}=req.body
        const post=new BlogModel({username,title,content,category,date,likes:0,comments:[]})
        await post.save()
         res.status(201).send({"msg":"New Details Added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
    
})

blogRoute.get('/',async(req,res)=>{
  
    try {
        const { title, category,sortBy} = req.query;
        console.log(title,sortBy,category)
        let query = BlogModel.find();
        let sort = 1; 
        if (category) {
            query = query.where('category', category);
        }
        if(title){
            query = query.where('title', new RegExp(title, 'i'));
        }

        sortBy==="asc"?sort=1:sort=-1
        query = query.sort({ date: sort });

        const bookings = await query.exec();
        res.status(200).send(bookings);
    } catch (err) {
        res.status(400).send({ "msg": err.message });
    }
    
})

blogRoute.patch("/:id",async(req,res)=>{
    const docId=req.params.id;
    const payload=req.body;
    try{
        await BlogModel.findByIdAndUpdate({_id:docId},payload);
        res.send({"msg":"updated successfully"})
    }catch(err){
        res.send({"msg":err.message})
    }
})

blogRoute.delete('/:id',async(req,res)=>{
    const postId=req.params.id
    try{
        const deletedData=await BlogModel.findByIdAndDelete({_id:postId})
        res.status(202).send({"msg":"Deleted"})
    }
    catch(err){
        res.send(err)
    }
    
})

module.exports={blogRoute}