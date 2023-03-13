const {S3}=require("aws-sdk")

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