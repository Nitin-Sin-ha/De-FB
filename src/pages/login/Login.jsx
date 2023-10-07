import { useEffect, useState } from "react";
import "./login.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Navigate, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import Alert from "react-bootstrap/Alert";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { NavigateBefore } from "@material-ui/icons";
import log from "./facebook logo i 0.png";
export default function Login({ contract, account, provider, setuser, user }) {
  const nav = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [text, setText] = useState("");
  const [coverpic, setcoverpic] = useState(null);
  const [modal, setmodal] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1a6eebac74dc1928e70f`,
            pinata_secret_api_key: `
            ec8173f8000f1a51f1f87a08fc7db3c22c8f239f0163c74163e4d2ffad2fd08b`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        setcoverpic(ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    // alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const check = async () => {
    try {
      const reg = await contract.checkRegisteredReturnRegNum();
      const regg = parseInt(reg);
      if (reg !== 0) {
        const data = await contract.getOthersUserStruct(regg);
        setuser({ name: data.userName, profilepic: data.profilePic });
        //    localStorage.setItem('username',user.name);
        //  localStorage.setItem('userpic',user.profilepic);
        // setuser({name : localStorage.getItem('username'), profilepic:  localStorage.getItem('userpic')})
        localStorage.setItem("name", data.userName);
        localStorage.setItem("pic", data.profilePic);
        // setuser({ name: localStorage.getItem("name"), profilepic: localStorage.getItem("pic")});
      }
    } catch {
      console.log("no user");
    }
  };
  useEffect(() => {
    account && check();
  }, [account, contract]);

  const register = async () => {
    try {
      await contract.registerUser(
        text,
        coverpic
          ? coverpic
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhwKw2TfJxMfz-tLOJtYsWgcivmu8CbSKe1iBR7H-Ug&s"
      );
      setuser({
        name: text,
        profilepic: coverpic
          ? coverpic
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhwKw2TfJxMfz-tLOJtYsWgcivmu8CbSKe1iBR7H-Ug&s",
      });
      localStorage.setItem("name", text);
      localStorage.setItem("pic", coverpic);
    } catch {
      user
        ? localStorage.setItem("name", user.name)
        : setuser({
            name: localStorage.getItem("name"),
            profilepic: localStorage.getItem("pic"),
          });
      user
        ? localStorage.setItem("pic", user.profilepic)
        : setuser({
            name: localStorage.getItem("name"),
            profilepic: localStorage.getItem("pic"),
          });

      setuser({
        name: localStorage.getItem("name"),
        profilepic: localStorage.getItem("pic"),
      });
      nav("/home");
    }
  };
  return (
    <div className="login" >
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">De-FB</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on De-FB.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="input1">
              {" "}
           {!localStorage.getItem('name') &&   <input
                onChange={(e) => {
                  setText(e.target.value);
                  console.log(text);
                }}
                placeholder="Name"
                className="loginInput"
              />}
            </div>
      { !localStorage.getItem('name') &&     <div className="input2">
              <input
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
              />
              {/* Upload Profile Pic */}
              <label for="file-upload">
                <div className="nama">
                  <FileUploadIcon fontSize="large" /> Choose Profile Pic
                </div>
              </label>
            </div>}
            {uploaded && (
              <div className="progressbar" style={{ width: `${uploaded}%` }}>
                <ProgressBar
                  now={uploaded}
                  striped
                  variant="success"
                  label={`${uploaded}%`}
                />
              </div>
            )}
       {  !localStorage.getItem('name') &&   <div className="upload-btn">
              <button onClick={handleSubmit} style={{ all: "unset" }}>
                Upload Profile Pic
              </button>
            </div>}
         {localStorage.getItem('name') &&  <div className="hj">

             <h1 className="loginLogo"> Go To Homepage </h1>
         </div>
         }   
            <div className="inputbtn">
              {" "}
              <button onClick={register} className="loginButton">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
