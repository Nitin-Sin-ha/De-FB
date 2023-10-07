import React, { useEffect, useState } from "react";
import "./Ads.css";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import uplaodimg from "./upload-icon-3.png";
import { storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ethers } from "ethers";
import facebookicon from "./facebook logo i 0.png"
import Topbar from "../../components/topbar/Topbar";
const fileTypes = ["JPG", "PNG", "GIF"];
// const send = async ()=>{
//   const res = await axios.post("https://susya.onrender.com",{
// "image":
// })
//   console.log(res);
// }

function Ads({user, contract, account,profilee,profiledata,sendreq,setprofile,finduser,ans,otherfrnd,already,j ,setj }) {
    const [inp,setinp]  = useState(null);
  const [file, setFile] = useState(null);
  const [imgurl, setimgurl] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log(file);
    const imageref = ref(storage, `images/${file.name + Math.random()}`);
    uploadBytes(imageref, file).then((data) => {
      console.log("image uploaded");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setimgurl(val);
      });
    });

    setTimeout(() => {
      console.log("deleted");
      console.log(imgurl);

      setFile(null);
    }, 2000);
  };

  const uploadAd = async()=>{

        try{
        const value = {value : ethers.utils.parseEther("0.005")};
        const transaction  = await contract.postAd(inp, imgurl,value)
        await transaction.wait();
        console.log("completed ads")

        }catch{
            console.log("error uplaod image");
        }
  }
  return (
<>
<Topbar user={user} setprofile={setprofile} finduser={finduser} contract={contract}/>
 
   
    <div className="dragdrop">
    
      <div className="upload">
        <FileUploader
          handleChange={handleChange}
          value={file}
          name="file"
          types={fileTypes}
        >
          <div className="content">
            {!file?
            <img
              className={`${!file ? "imgup2" : "imgup2 imgup1"}`}
              src={uplaodimg}
              alt=""
            />:
            <div class="center">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
            }
          </div>
        </FileUploader>
        
          <h1 className={`${!file ? "title1" : "title1 title2"}`} style={{ cursor: "default" }}></h1>
       
 
            
         
      </div>
      
       
    <>
            <div className="urrl">
             <div className="imag"> <img src={imgurl ? imgurl :facebookicon} alt="" /></div>
               <div className="conte">
                <h1>Company Name</h1>
                <input onChange={(e)=>(setinp(e.target.value))} type="text" name="" id="company" /></div>


                <button className="sub" onClick={uploadAd}>Upload</button>
            </div>
         

            </>      
        
   

    </div>


    </>   
  );
}

export default Ads;
