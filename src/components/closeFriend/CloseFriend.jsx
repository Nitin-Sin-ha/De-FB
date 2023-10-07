import { useEffect, useState } from "react";
import "./closeFriend.css";

export default function CloseFriend({ index, u, contract, user,setjugg,iii }) {
  const [userdataa, setuserdataa] = useState(null);
  const finduserr = async () => {
    try {
      const reg = await contract.findUser(u);
      const regNo = parseInt(reg);
      const usedata = await contract.getOthersUserStruct(parseInt(regNo));
      setuserdataa(usedata);
      console.log(userdataa);
    } catch {
      console.log("Could not fetch from profile file jsx");
    }
  };

  useEffect(() => {
    contract && finduserr();
  }, []);

  const accept = async () => {
      try{   
        
        
        const tx = await contract.acceptFriendRequests(index);
        await tx.wait();
        setjugg("fhjdjcx")
      
      }
      catch{console.log("error in accepting friend request")}


  };
  const decline = async () => {
    try{    await contract.deleteFriendrequest(index);}
    catch{console.log("error in accepting friend request")}


};
  return (
    <li className="sidebarFriend">
      <div className="content">
        {" "}
        <div>
        <img
          className="sidebarFriendImg"
          src={userdataa && userdataa.profilePic}
          alt=""
        />
        </div>
        <div>
        <span
          
          className="sidebarFriendName"
          >
          {userdataa && userdataa.userName}
        </span>
      </div>
          </div>
      <div>
        {" "}
        <span style={{ marginRight: "0px" }} className="sidebarFriendName">
          <button className="mna"onClick={accept}>Accept</button>
        </span>
        <span style={{ marginRight: "0px" }} className="sidebarFriendName">
          <button className="mna1"onClick={decline}>Decline</button>
        </span>
      </div>
    </li>
  );
}
