const {Router} = require("express")
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const multer  = require('multer')
const path = require("path")

const router = Router();

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

const upload = multer({ storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
})

router.post("/",upload.single("coverImgUrl"),async (req,res)=>{
    const {title,body} = req.body
    await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImgUrl:`uploads/${req.file.filename}`
    })
    res.redirect("/") 
})

router.get("/:id",async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments= await Comment.find({blogId:req.params.id}).populate("createdBy");

    return res.render("blog",{
        user:req.user, 
        blog,
        comments,
    })
})

router.post("/comment/:blogId",async (req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;