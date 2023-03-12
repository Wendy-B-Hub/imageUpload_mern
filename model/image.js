const mongoose=require('mongoose')
const {Schema}=mongoose

const ImageSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    data:Buffer,
    contentType:String
  }
})


const Image=mongoose.model('Image',ImageSchema)
module.exports=Image;