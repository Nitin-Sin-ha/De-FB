import { useEffect, useState } from "react";
import "./online.css";

export default function Online({user,contract,j}) {
  const [userdataa, setuserdataa] = useState(null);
  const finduserr = async () => {
    try {
      const reg = await contract.findUser(user);
      const regNo = parseInt(reg);
      const usedata = await contract.getOthersUserStruct(parseInt(regNo));
      setuserdataa(usedata);
      console.log(userdataa);
    } catch {
      console.log("Could not fetch from profile file jsx");
    }
  };
  useEffect(()=>{
    contract && finduserr();
  },[])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     contract && finduserr();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={userdataa?userdataa.profilePic:" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhwKw2TfJxMfz-tLOJtYsWgcivmu8CbSKe1iBR7H-Ug&s"
} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{userdataa ? userdataa.userName: "hello"}</span>
    </li>
  );
}
