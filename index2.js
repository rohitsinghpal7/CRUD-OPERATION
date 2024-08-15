const express=require("express");
const app=express();
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")


const path=require("path");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
//DATA
let posts=[
     {
          id:uuidv4(),
     username:"rohitsinghpal",
     content:"i love lion who looks like is very pretty",
     },
     {
          id:uuidv4(),
          username:"rohitsinghpal1",
          content:"i love hourse who looks like is very balck",
          },
          {
               id:uuidv4(),
               username:"rohitsinghpal2",
               content:"i love apple who looks like is very redies",
               }
]
//POST 
app.get("/posts",(req,res)=>{
     res.render("index.ejs",{posts});
});
     app.get("/posts/new",(req,res)=>{
          res.render("new.ejs");

})
// USERNAME ID ROUTE
app.post("/posts",(req,res)=>{
     let {username,content}=req.body;
     let id=uuidv4();
     posts.push({id,username,content});
     res.redirect("/posts");
});
//SEE POST ROUTE
app.get("/posts/:id",(req,res)=>{
     let {id}= req.params;
     let post = posts.find((p)=> id === p.id);
    
     res.render("show.ejs",{post});
     
});
//EDIT YOUR POST
app.patch("/posts/:id",(req,res)=>{
     let {id}= req.params;
     let newContent=req.body.content;
     let post = posts.find((p)=> id === p.id);
     post.content=newContent;
     console.log(post);
     res.redirect("/posts");

});
// EDIT ROUTE
app.get("/posts/:id/edit",(req,res)=>{
     let {id}= req.params;
     let post = posts.find((p)=> id === p.id);
     res.render("edit.ejs",{post});


});
//DELETE ROUTE
app.delete("/posts/:id",(req, res)=>{

     let {id}= req.params;
     posts = posts.filter((p)=> id !== p.id);
  
      res.redirect("/posts");
     


})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port ,()=> {
     console.log(`app is listening ${port}`);

});