import { useEffect, useState } from "react";
import "./topbar.css";
import { Search } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { colors } from "@material-ui/core";

export default function Topbar({
  user,
  profilee,
  setprofile,
  contract,
  finduser,
}) {
  const nav = useNavigate();
  const [bala, setbala] = useState(null);
  const [text, settext] = useState("");
  const handleclick = () => {
    setprofile(text);
  };

  const showbal = async () => {
    try {
      const bal = await contract.showBalance();
      console.log(parseInt(bal));
      setbala(parseInt(bal));
    } catch (error) {
      console.log("error from showBalance");
    }
  };

  useEffect(() => {
    contract && showbal();
  }, [contract]);

  const convertToEth = async () => {
    try {
      const tx = await contract.convertCoinsToEth();
      tx.wait();
      showbal();
    } catch {
      console.log("error from converting");
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">De-FB</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            onChange={(e) => {
              settext(e.target.value);
            }}
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span>
            <button
              style={{ cursor: "pointer", marginRight: "12px" }}
              onMouseEnter={() => {
                text !== "" && setprofile(text);
              }}
              onClick={() => {
                finduser();
                {
                  text !== "" && nav("/profile");
                }
              }}
            >
              {" "}
              Find User{" "}
            </button>
          </span>
          <span
            className="topbarLink"
            onClick={() => {
              nav("/home");
            }}
          >
            Homepage
          </span>
          <span className="topbarLink"></span>
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>

            
          </div> */}
          <div className="topbarIconItem" style={{ fontWeight: "bolder" }}>{`${
            bala ? bala + " Token " : "00 Token "
          }`}</div>
          <button
            onClick={convertToEth}
            className="topbarIconItem"
            style={{
              background: "green",
              fontWeight: "bold",
              color: "white",
              padding: "4px",
              borderRadius: "2px",
            }}
          >
            {" "}
            Convert to Eth{" "}
          </button>
        </div>
        <img
          onMouseEnter={() => {
            setprofile(localStorage.getItem("name"));
          }}
          onClick={() => {
            setprofile(localStorage.getItem("name"));
            finduser();
            nav("/profile");
          }}
          src={user ? user.profilepic : localStorage.getItem("pic")}
          alt=""
          className="topbarImg"
        />
      </div>
    </div>
  );
}
