import React,{useState} from "react";

export default function App(){
  const[fileData,setFileData]=useState();
  
  const fileChangeHandler=(e)=>{
    setFileData(e.target.files[0])
  }

  const onSubmitHandler=(e)=>{
     e.preventDefault()

     const data=new FormData();
     data.append('image',fileData)
     //   Handle file Data from the state Before Sending
     fetch("http://localhost:8000/single",{
         method:"POST",
         body:data,
     })
     .then((result)=>{
      console.log("File Sent Successfully")
     })
     .catch((err)=>{
      console.log(err.message)
     })
  }


  return(
    <>
    <div className="App">
      <h1>
        React App File Uploading
      </h1>
      <form onSubmit={onSubmitHandler}>
        <input type="file" onChange={fileChangeHandler}/>
        <br/>
        <br/>
        <button type="submit">
          Submit File to backend
        </button>
      </form>
    </div>
    </>
  )
}


































