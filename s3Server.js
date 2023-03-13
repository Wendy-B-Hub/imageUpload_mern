const {S3}=require("aws-sdk")
require("dotenv").config()

//using multer to upload the image to the s3
exports.s3Uploadv2=async(files)=>{
  const s3=new S3();
  // console.log(Array.isArray(files))  //true
  // console.log(files[0])   
 /* {
    fieldname: 'manyImages',
    originalname: 'WechatIMG2.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: <Buffer ff d8 ff e1 56 de 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 06 01 12 00 03 00 00 00 01 00 06 00 00 01 1a 00 05 00 00 00 01 00 00 00 56 01 1b 00 05 ... 6633078 more bytes>,
    size: 6633128
  }*/

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

/*
about s3.getSignedUrlPromise
The s3.getSignedUrlPromise() method generates a pre-signed URL that allows the client to upload a file directly to an S3 bucket, without the need for the client to have AWS credentials.

The getSignedUrlPromise() method does not actually upload the file to S3. Instead, it generates a temporary URL that can be used to upload the file using an HTTP PUT request. This URL includes a signature that authorizes the client to upload the file to a specific S3 bucket and key.

Once the client has the pre-signed URL, it can use it to upload the file to S3 using any HTTP client library, such as fetch(), axios, or XMLHttpRequest.

Here's an example of how you can use the pre-signed URL to upload a file to S3:
*/
