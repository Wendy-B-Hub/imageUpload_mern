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


# get s3 image url and display it to the webpage


 1.get secure url from our server
 
 2.post the image direclty to the s3 bucket
 
 3.post requst to my server to store any extra data
 
 
 in `s3BucketImage.ejs` to handler submit and render image
 
 
 handle get request
 
 ```javascript
 //using s3 bucket get upload url
app.get("/s3Url",async (req,res)=>{
  const url = await generateUploadUrl()
  console.log(url)
  res.send({url})
})
 
 ```
 
 in. `s3Server.js` 
 
 ```javascript
 
 //get the pre-signed url that you can upload the image to the s3, using `PUT` method
//in the `s3BucketImage.ejs`

exports.generateUploadUrl=async()=>{
  const region = "us-west-2";
  const bucketName = process.env.AWS_BUCKET_NAME
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'v4'
  })
  const imageName="random";
  const params=({
      Bucket:process.env.AWS_BUCKET_NAME,
      Key:`uploads/${Date.now()}_1235345`,
      Expires:600
  })

  const uploadUrl=await s3.getSignedUrlPromise('putObject',params);

  return uploadUrl;
}

 
 ```
 
 
 
 
 
 
 


