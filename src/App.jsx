import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import back from "./artifacts/contracts/socialMedia.sol/socialMedia.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import Ads from "./pages/ads/Ads";

function App() {
  const nav = useNavigate();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [profiledata, setprofiledata] = useState(null);
  const [j, setj] = useState("n");
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x577F160CF69310CcafBBCBb07f120dd0919C6DB1";
        //"0x47EFABB0c36E2EF324dfa0a1293CA56c4b9957fB"

        ///  devpost fleek + sepolia = "0xA94070B0d22cAfF5d8C8b2b0E4Ce62fa308fb652"
        // fleek + filecoin "0x1742c8d0abA4eb87b998E628E9e0670585591214"

        // final hosted address fleek+sepolia"0xA877d4515B3891181c0B141F4F4ec9091aB21f86"

        //"0x7141d3E41BD578BdB8C490929acB896f38418c1D";

        const contract = new ethers.Contract(contractAddress, back.abi, signer);
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  const [user, setuser] = useState(null);
  const [profilee, setprofile] = useState("");
  useEffect(() => {
    console.log(user);
    console.log(account);
    // setuser(localStorage.getItem('user'));
    //  setuser({name: localStorage.getItem('name'),profilepic : localStorage.getItem('pic')})
    // localStorage.setItem('name',user.name);
    // localStorage.setItem('pic',user.profilepic);
  }, [account]);
  const finduser = async () => {
    try {
      const reg = await contract.findUser(profilee);
      const regNo = parseInt(reg);
      const usedata = await contract.getOthersUserStruct(parseInt(regNo));
      setprofiledata(usedata);
      console.log(profiledata);
      // nav('/profile')
    } catch {
      console.log("Could not fetch from profile file jsx");
    }
  };
  const sendreq = async () => {
    try {
      await contract.sendFriendRequest(profiledata.userName);
      //  setsent(true)
    } catch (err) {
      console.log(err);
      console.log(profiledata.userName);
    }
  };
  const [ans, setans] = useState(false);
  const [otherfrnd, setotherfrnd] = useState([]);
  const [mat, setmat] = useState([]);
  const [already, setalready] = useState(false);
  const checkfriend = async () => {
    try {
      const rno = await contract.findUser(profiledata.userName);
      const rnoo = parseInt(rno);
      const anss = await contract.checkFriendRequestAlreadySent(rnoo);
      const dans = await contract.seeOthersFriends(rnoo);
      const alr = await contract.checkAlreadyFriends(profiledata.userName);

      setalready(alr);

      setans(anss);

      console.log(ans);
      console.log(dans);

      setotherfrnd(dans);
    } catch {
      console.log("soory could not checkkkk frnd req");
    }
  };
  // const imgg = ()=>{
  //   const imh=[];
  //   otherfrnd.length!==0 && otherfrnd.map((item)=>{
  //       const aa = contract.findUser(item);
  //       const niga = parseInt(aa);
  //       const nig = contract.getOthersUserStruct(niga);
  //       imh.push(nig.profilePic);
  //   })
  //   setmat(imh);
  //   console.log(mat)
  // }
  // useEffect(()=>{
  //   setuser({ name: localStorage.getItem("name"), profilepic: localStorage.getItem("pic")});
  // },[account])

  useEffect(() => {
    profiledata && checkfriend();
    // otherfrnd.length!==0 && imgg();
  }, [profiledata]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Login
            account={account}
            provider={provider}
            contract={contract}
            setuser={setuser}
            user={user}
          />
        }
      ></Route>

      <Route
        exact
        path="/home"
        element={
          user ||
          (localStorage.getItem("name") && localStorage.getItem("pic")) ? (
            <Home
              profilee={profilee}
              setprofile={setprofile}
              account={account}
              provider={provider}
              contract={contract}
              user={user}
              finduser={finduser}
              profiledata={profiledata}
              setj={setj}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>

      <Route
        exact
        path="/ads"
        element={
          user ||
          (localStorage.getItem("name") && localStorage.getItem("pic")) ? (
            <Ads
              account={account}
              provider={provider}
              contract={contract}
              user={user}
              profilee={profilee}
              profiledata={profiledata}
              finduser={finduser}
              sendreq={sendreq}
              setprofile={setprofile}
              ans={ans}
              otherfrnd={otherfrnd}
              already={already}
              setj={setj}
              j={j}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>

      <Route
        exact
        path="/profile"
        element={
          profilee ? (
            <Profile
              account={account}
              provider={provider}
              contract={contract}
              user={user}
              profilee={profilee}
              profiledata={profiledata}
              finduser={finduser}
              sendreq={sendreq}
              setprofile={setprofile}
              ans={ans}
              otherfrnd={otherfrnd}
              already={already}
              setj={setj}
              j={j}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
    </Routes>
  );
}

export default App;
