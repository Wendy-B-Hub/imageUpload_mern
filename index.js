const express=require('express')
const app=express();
const path=require('path')
const mongoose=require('mongoose')
const multer=require('multer')
const Image=require('./model/image')
const cors=require('cors')
const port=8000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //parse req.body to access it
app.use(cors())

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('mongoose is open!!')
    })
    .catch((err) => {
        console.log('mongo connection error!');
        console.log(err);
    })

const Storage=multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb)=>{
    // cb(null,file.originalname);
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})

const upload=multer({
  storage:Storage
})


app.get('/',(req,res)=>{
  // res.send("this is image upload homepage")
  res.render('imageUpload')
})


// upload single image
app.post("/single",upload.single("image"),async (req,res)=>{
  console.log(req.file)
  const newImage=new Image({
    name:req.body.name,
    image:{
      data:req.file.buffer,
      contentType:'image/jpeg'
    }
  })
  await newImage.save()
  .then(()=>{
    res.send("image save successfully")
  })
  .catch((err)=>{
    console.log("cannot save")
    console.log(err)
  })

})

//upload multiple images,with max counts of files allowed to upload
app.post("/many",upload.array("manyImages",5),async(req,res)=>{
  res.send("uploaded")
})

 app.listen(port,()=>{
  console.log(`app is listining to ${port} port , ${new Date()}`)
 })   
