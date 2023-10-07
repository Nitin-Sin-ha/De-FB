import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";

export default function Sidebar({user,contract,setj}) {
  const [jugg,setjugg ] = useState("fjdj");
  const [frar,setfrar] = useState(null);
  const friendreq = async()=>{
    const arr = await contract.seeFriendRequests();
    setfrar(arr);
    console.log(arr); 
  }
  useEffect(()=>{
    contract &&  friendreq();
    setj(jugg);
  },[jugg,contract])
  useEffect(() => {
    const interval = setInterval(() => {
      contract &&  friendreq();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(()=>{
  //     setj(jugg);
  // },[jugg])
  const [alll,setalll] = useState([])
  const all = async () => {
    const data = await contract.allUsers();
    const alldata = await Promise.all(
      data.map((player) => {
        return player;
      })
    );
    console.log(alldata);
    setalll(alldata);
    
  };
  useEffect(()=>{
   contract &&   all();
  },[contract])
  useEffect(()=>{
    contract &&   all();
   },[])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <h1>All Users</h1>
          {/* <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}

          {alll.length!==0 && alll.map((item)=>{
return(
<li className="rightbarFriend">
<div className="rightbarProfileImgContainer">
  <img className="rightbarProfileImg" src={item.profilePic} alt="" />
  <span className="rightbarOnline"></span>
</div>
<span className="rightbarUsername"><h3>{item.userName}</h3></span>
</li>
)
          }) }


        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
         {/* <div>  <h2> Friend Request</h2></div> */}
          {frar && frar.map((u,key) => (
           (u!=="accepted"&&u!=="deleted") && <CloseFriend index={key} u={u} contract={contract} user={user} setjugg={setjugg}/>
      
          ))}
        </ul>
      </div>
    </div>
  );
}
