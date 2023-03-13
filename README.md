# imageUpload_mern

store the image to server

## front-end 
  use React to render single page



# store image to aws s3

`npm i aws-sdk` using version 2


in `index.js` some changes:

```
const Storage=multer.memoryStorage()
app.post("/many",upload.array("manyImages",5),async(req,res)=>{
  const result=await s3Uploadv2(req.files)
  res.json({status:"success",result})
})

 app.listen(port,()=>{
  console.log(`app is listining to ${port} port , ${new Date()}`)
 })   
 ```

`s3Server.js` 

```javascript

//using multer to upload the image to the s3
exports.s3Uploadv2=async(files)=>{
  const s3=new S3();
  //upload multiple images
  files.map(async (file)=>{
    const param={
      Bucket:process.env.AWS_BUCKET_NAME,
      Key:`uploads/${Date.now()}-${file.originalname}`,
      Body:file.buffer
  
    }
    const result =await s3.upload(param).promise();
    return result;
  })
}

```
