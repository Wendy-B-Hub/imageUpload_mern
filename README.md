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

`s3Server.js`  handle aws s3
