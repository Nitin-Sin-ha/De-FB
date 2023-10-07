import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Post({
  post,
  contract,
  seeallpost,
  setjugaad,
  user,
  comop,
  setcomop,
}) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [k, setk] = useState(true);
  const [mycomment, setmycomment] = useState("");
  const [allcomment, setallcomments] = useState(null);

  // const finduse=async(hello)=>{
  //  const rno =  await contract.findUser(hello);
  //  const rnoo = parseInt(rno);
  //  const
  // }

  const getuserInfo = async () => {
    try {
      const userdata = await contract.getOthersUserStruct(
        parseInt(post.registrationNumber)
      );
      setuserdata(userdata);
      console.log(userdata);
    } catch {
      console.log("sorry could not fetch user data");
    }
  };
  useEffect(() => {
    post && getuserInfo();
  }, [post]);

  const docomm = async () => {
    try {
      const tx = await contract.doAComent(
        mycomment,
        parseInt(post.allPostIndex)
      );
      await tx.wait();
      setjugaad("hello");
      seepostcomment();
      setmycomment("");
    } catch {
      console.log("could not comment");
    }
  };

  const seepostcomment = async () => {
    try {
      const temp = await contract.seeCommentOnPost(parseInt(post.allPostIndex));
      //  console.log(temp);
      const temp1 = [];
      for (let index = 0; index < temp.length; index++) {
        const tempo = temp[index].split(" : ");
        const rno = await contract.findUser(tempo[0]);
        const rnoo = parseInt(rno);
        const userdata = await contract.getOthersUserStruct(rnoo);
        tempo.push(userdata.profilePic);
        temp1.push(tempo);
      }
      console.log(temp1);
      setallcomments(temp1);
    } catch (error) {
      console.log("could see seepostcomment");
    }
  };

  const likeHandler = async () => {
    try {
      const tx = await contract.doALike(parseInt(post.allPostIndex));
      await tx.wait();
      setjugaad("nama");
    } catch {
      console.log("could not like");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      seepostcomment();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={userdata ? userdata.profilePic : post.imageLink}
                alt=""
              />
              <span className="postUsername">
                {userdata ? userdata.userName : "dummy"}
              </span>
              <span className="postDate"> </span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText"> </span>
            <img className="postImg" src={post.imageLink} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="assets/like.png"
                onClick={likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                src="assets/heart.png"
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">
                {" "}
                {parseInt(post.likes._hex)} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span
                onClick={() => {
                  setcomop(!comop);
                  seepostcomment();
                }}
                className="postCommentText"
              >
                comments
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${comop ? "comment" : "comment comment1"}`}>
        <div className="myinput">
          <div>
            <img
              className="postProfileImg"
              src={user ? user.profilepic : localStorage.getItem('pic')}
              alt=""
              srcset=""
            />
          </div>
          <div>
            <FormControl fullWidth variant="standard" sx={{ width: 490, m: 1 }}>
              <InputLabel htmlFor="standard-adornment-amount">
                Comment{" "}
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                onChange={(e) => {
                  setmycomment(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="commentbtn">
            <button
              style={{ all: "unset", cursor: "pointer" }}
              onClick={docomm}
            >
              {" "}
              <ArrowForwardIcon fontSize="large" color="success" />
            </button>
          </div>
        </div>

        {
          /* others commnets data.map*/
          allcomment &&
            allcomment.map((item) => {
              return (
                <>
                  <div className="othercomment">
                    <div className="poo">
                      {" "}
                      <img
                        src={item[2]}
                        className="postProfileImg"
                        alt=""
                        srcset=""
                      />
                      {item[0]}{" "}
                    </div>
                    <div> {item[1]} </div>
                  </div>
                  <hr style={{ width: 600 }} />
                </>
              );
            })
        }
      </div>
    </>
  );
}
