import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Feed({
  user,
  contract,
  account,
  provider,
  profiledata,
  profilee,
}) {
  const loc = useLocation();
  const [post, setpost] = useState(null);
  const [len,setlen] = useState(-1);
  const [reload,setreload] = useState(false)
  const [jugaad,setjugaad] = useState(null);

  const [names, setnames] = useState(null);
  const [comop,setcomop] = useState(false);
 

  const nav = useNavigate();


  const numberpost=async()=>{
    const  leng = await contract.totalNumberOfPosts();
       setlen(leng)
    console.log(parseInt(leng._hex));
    return parseInt(leng._hex);
  }
   

  const seeallpost = async () => {
    try {
      if (loc.pathname === "/home") {
        const mypost = await contract.seeAllPosts();
        const allimagearray = await Promise.all(
          mypost.map((player) => {
            return player;
          })
        );
        console.log(user);

        // console.log(allimagearray);
        setpost(allimagearray);
        console.log(post);
          setreload(!reload);
        //  setlen(allimagearray.length)
      }

      if (loc.pathname === "/profile") {
        console.log("i am profile loc");

        const num = profiledata.registrationNumber;
        const num2 = parseInt(num);
        const mypost = await contract.seeSpecificFriendsPost(parseInt(num2));
        const allimagearray = await Promise.all(
          mypost.map((player) => {
            return player;
          })
        );
        console.log(user);

        console.log(allimagearray);
        setpost(allimagearray);
        console.log(post);
      

        //  console.log(allimagearray.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //   seeallpost();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(()=>{
    seeallpost()
  },[])
  useEffect(()=>{
    seeallpost();
  },[jugaad,loc.pathname,profiledata,account,contract])
  // setTimeout(() => {
  //  post && seeallpost()
  // }, 20000);

  return (
    <div className="feed">
      <div className="feedWrapper">
    {loc.pathname==='/home' ?
        <Share
          user={user}
          contract={contract}
          account={account}
          provider={provider}
          seeallpost={seeallpost}
          setjugaad = {setjugaad}
        />: <h1>User's Posts</h1>
        
        }
        {post &&
          post.map((p) => (
            <Post post={p} contract={contract} seeallpost={seeallpost} setjugaad={setjugaad} user={user} comop = {comop} setcomop= {setcomop}/>
          ))}
      </div>
    </div>
  );
}
