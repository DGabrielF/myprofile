import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import FriendToAdd from "./FriendToAdd";
import YourFriend from "./YourFriend";
import FriendRequest from "./FriendRequest";
import YourRequests from "./YourRequests";
import BlockList from "./BlockList";
import { FBFetchData, db } from "../../../firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function Friends ({user, setToast, setMenuSelected, setPrevPage}) {
  const [usersList, setUsersList] = useState([]);
  const [usersToShow, setUsersToShow] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [applicantsList, setApplicantsList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const coll = "Users"
 
  const startLists = async () => {
    const userDB = usersList.find(item => item.id === user.uid);
    
    if (userDB) {
      setApplicantsList(userDB.applicantsList || []);
      setBlockList(userDB.blockList || []);
      setFriendsList(userDB.friendsList || []);
      setRequestList(userDB.requestList || []);
      
      const updatedUsersList = usersList.filter(item => 
    item.id !== user.uid && 
    !userDB.applicantsList.some(applicant => applicant.uid === item.id) &&
    !userDB.blockList.some(blocked => blocked.uid === item.id) &&
    !userDB.friendsList.some(friend => friend.uid === item.id) &&
    !userDB.requestList.some(request => request.uid === item.id)
    );

      setUsersToShow(updatedUsersList);
    }
  };

  useEffect(() => {
    startLists();
  }, [usersList, applicantsList, blockList, friendsList, requestList]);

  useEffect(() => {
    const fetchDataAndStart = async () => {
      try {
        const fetchedData = await FBFetchData(setUsersList, coll);
        await startLists();
      } catch (error) {
        setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
        console.log(error.message);
      }
    };
    fetchDataAndStart();
  }, [refresh]);

  const handleSearch = e => setFilteredUsers(usersToShow.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
 
  const handleAdd = async (e, user, friend) => {
    const userName = usersList.find(item => item.id === user.uid).name;
    try {
      await updateDoc(doc(db, coll, user.uid), { 
        requestList: arrayUnion({ name: friend.name, uid: friend.id })
      });
      await updateDoc(doc(db, coll, friend.id), { 
        applicantsList: arrayUnion({ name: userName, uid: user.uid })
      });
      
      setRequestList([...requestList, friend]);
      setUsersToShow(usersToShow.filter(item=>item.name!==friend.name));

      setToast({ isOn: true, type: "success", title: "Sucesso", message: "Solicitação enviada" });
      setRefresh(!refresh);
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message);      
    }
  }
  const handleAccept = async (e, applicant) => {
    const userName = usersList.find(item => item.id === user.uid).name;
    try {
      await updateDoc(doc(db, coll, user.uid), {
        applicantsList: arrayRemove({ name: applicant.name, uid: applicant.uid }),
        friendsList: arrayUnion({ name: applicant.name, uid: applicant.uid }),
      })

      await updateDoc(doc(db, coll, applicant.uid), {
        requestList: arrayRemove({ name: userName, uid: user.uid }),
        friendsList: arrayUnion({ name: userName, uid: user.uid }),
      });

      setFriendsList([...friendsList, applicant]);
      setApplicantsList(applicantsList.filter(item=>item.name!==applicant.name));

      setToast({ isOn: true, type: "success", title: "Parabéns", message: `Agora você e ${applicant.name} são amigos` });
      setRefresh(!refresh);
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message);
    }
  } 
  const handleReject = async (e, applicant) => {
    try {
      await updateDoc(doc(db, coll, user.uid), {
        applicantsList: arrayRemove({ name: applicant.name, uid: applicant.uid }),
        blockList: arrayUnion({ name: applicant.name, uid: applicant.uid })
      })
      setBlockList([...blockList, applicant]);
      setApplicantsList(applicantsList.filter(item=>item.name!==applicant.name));

      setToast({ isOn: true, type: "success", title: "Sucesso", message: `${applicant.name} está na lista de bloqueados` });
      setRefresh(!refresh);
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message);
    }
  }
  const handleDelete = async (e, friend) => {   
    const userName = usersList.find(item => item.id === user.uid).name;
    try {
      await updateDoc(doc(db, coll, user.uid), { 
        friendsList: arrayRemove({ name: friend.name, uid: friend.uid })
      });
      await updateDoc(doc(db, coll, friend.uid), { 
        friendsList: arrayRemove({ name: userName, uid: user.uid })
      });
      
      setUsersList([...usersList, friend]);
      setFriendsList(friendsList.filter(item=>item.name!==friend.name));

      setToast({ isOn: true, type: "success", title: "Sucesso", message: `Você não é mais amigo de ${friend.name}` });
      setRefresh(!refresh);
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message);      
    }
  }
  const handleRestore = async (e, applicant) => {
    try {
      await updateDoc(doc(db, coll, user.uid), { 
        blockList: arrayRemove({ name: applicant.name, uid: applicant.uid })
      });
      
      setUsersList([...usersList, applicant]);
      setBlockList(blockList.filter(item=>item.name!==applicant.name));

      setToast({ isOn: true, type: "success", title: "Sucesso", message: `${applicant.name} pode lhe enviar soliciações` });
      setRefresh(!refresh);
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message);      
    }
  }
  const handleRequest = async (e, friend) => {
    try {
      await updateDoc(doc(db, coll, user.uid), {
        requestList: arrayRemove({ name: friend.name, uid: friend.uid })
      });
      await updateDoc(doc(db, coll, friend.uid), {
        requestList: arrayRemove({ name: friend.name, uid: friend.uid })
      });

      setToast({ isOn: true, type: "success", title: "Sucesso", message: `Solicitação cancelada` });
      setRefresh(!refresh)
    } catch (error) {
      setToast({ isOn: true, type: "error", title: "Erro", message: error.message });
      console.log(error.message); 
    }
    
  }
  
  let content;
  content = user.uid?
    <div className="w-full h-full text-violet-500">
      <div className="title-text">AMIGOS</div>
      <div className="w-[95%] my-1 mx-auto flex justify-between sm:justify-end items-center gap-2">
        <div className="flex items-center sm:gap-2">
          <div className="hide-text-when-small">BUSCA</div>
          <FaSearch className="icon"/>
        </div>
        <input className="inputs" placeholder="Fulano" onChange={e => handleSearch(e)}></input>
      </div>
      <div className="separator"></div>
      <div className="list">
        <div className="subtitle">ADICIONE AOS AMIGOS</div>
        <div className="list-container">
          {(filteredUsers.length!==0?filteredUsers:usersToShow).map((item, index) => (item.id!==user.uid?<FriendToAdd user={user} item={item} index={index} handleAdd={handleAdd} />:<></>))}
        </div>
      </div>
      {(friendsList.length !== 0 && friendsList[0]!==undefined)?
      <>
        <div className="separator"></div>
        <div className="list">
          <div className="subtitle">SEUS AMIGOS</div>
          <div className="list-container">
            {usersList.find(item => item.id === user.uid).friendsList.map((item, index) => <YourFriend item={item} index={index} handleDelete={handleDelete} />)}
          </div>
        </div>
      </>:
      <></>
      }
      {(applicantsList.length !== 0 && applicantsList[0]!==undefined)?
      <>
        <div className="separator"></div>
        <div className="list">
          <div className="subtitle">SOLICITAÇÕES DE AMIZADE</div>
          <div className="list-container">
            {usersList.find(item => item.id === user.uid).applicantsList.map((item, index) => <FriendRequest item={item} index={index} handleAccept={handleAccept} handleReject={handleReject} />)}
          </div>
        </div>
      </>:
      <></>
      }
      {(requestList.length !== 0 && requestList[0]!==undefined)?
      <>
        <div className="separator"></div>
        <div className="list">
          <div className="subtitle">AGUARDANDO</div>
          <div className="list-container">
            {usersList.find(item => item.id === user.uid).requestList.map((item, index) => <YourRequests item={item} index={index} handleRequest={handleRequest} />)}
          </div>
        </div>
      </>:
      <></>
      }
      {(blockList.length !== 0 && blockList[0]!==undefined)?
      <>
        <div className="separator"></div>
        <div className="list">
          <div className="subtitle">BLOQUEADOS</div>
          <div className="list-container">
            {usersList.find(item => item.id === user.uid).blockList.map((item, index) => <BlockList item={item} index={index} handleRestore={handleRestore} />)}
          </div>
        </div>
      </>:
      <></>
      }
      <div className="separator"></div>
    </div>:
    <>
      {setPrevPage("Amigos")}
      {setMenuSelected("Login")}
    </>

  return <>{content}</>
}