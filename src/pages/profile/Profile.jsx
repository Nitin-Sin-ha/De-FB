import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";

export default function Profile({ user, contract, account,profilee,profiledata,sendreq,setprofile,finduser,ans,otherfrnd,already,j ,setj }) {
  const [userdata,setuserdata]=useState(null);
  // const finduser=async()=>{
  //     try{ const reg = await contract.findUser(profilee);
  //           const regNo = parseInt(reg);
  //           const usedata = a    
  //           setuserdata(usedata);
  //         }catch{console.log("Could not fetch from profile file jsx");}
      
      
  // }
  // useEffect(()=>{
  //     profilee && finduser();
  // },[profilee])
    // const sendreq=async()=>{
    //     await contract.sendFriendRequest(profiledata.userName);
    // }
  return (
    <>
      <Topbar user={user} setprofile={setprofile} finduser={finduser}/>
      <div className="profile">
        <Sidebar user={user} contract={contract} setj={setj}/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img className="profileUserImg" src={profiledata?profiledata.profilePic:localStorage.getItem('pic')} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profiledata?profiledata.userName:"Bro"}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed user={user} contract={contract} profiledata={profiledata} profilee={profilee} />
            <Rightbar profile  profilee={profilee} profiledata={profiledata} sendreq={sendreq} ans = {ans} user = {user} contract={contract} otherfrnd={otherfrnd} already={already} j={j}/>
          </div>
        </div>
      </div>
    </>
  );

}