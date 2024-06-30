import { useState, useEffect, useCallback } from "react";
import { Hamburguer } from "./Hamburguer";
import { Menu } from "../Menu";
import adminLinks from "../../data/hamburguerAdmin.json";
import userLinks from "../../data/hamburguerUser.json";
import viewerLinks from "../../data/hamburguerViewer.json";
import { Profile } from "./Profile";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const fetchUserData = useCallback(async () => {    
    const idUser = localStorage.getItem('idUser');
    if (idUser) {
      try {
        const response = await fetch(`http://127.0.0.1:8080/user/${idUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const dataUser = await response.json();          
          setIsLoggedIn(true); 
          setIsAdmin(dataUser.role === "ADMIN");                   
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      }
    }
  }, []);

  
  const fetchUserName = useCallback(async () => {    
    
    const idUser = localStorage.getItem('idUser');
      try {
        const response = await fetch(`http://127.0.0.1:8080/user/${idUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const dataUser = await response.json();          
          setUserName(dataUser.userName);
          setIsLoggedIn(true); 
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      }
    

  }, [])

  useEffect( () => {   
    console.log(1) 
    fetchUserName();
  }, [isLoggedIn, fetchUserName])

  
  useEffect( () => {
    console.log(2) 
    const idUser = localStorage.getItem('idUser');
    if (idUser) {
      setIsLoggedIn(true)
      fetchUserName();
      console.log(" hook isLoggedIn: " + isLoggedIn)
    } else {
      setIsLoggedIn(false);
    }
  })


  useEffect(() => {
    console.log(3) 
    if (isMenuOpen) {
      fetchUserData();
    }
  }, [isMenuOpen, fetchUserData]);

  const onMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderMenu = () => {
    if (!isLoggedIn) {
      return <Menu navClassName={"ham-viewer-menu"} ulClassName={"ulClass"} className={"ham-viewer-li"} links={viewerLinks} />;
    }

    return isAdmin 
      ? <Menu navClassName={"ham-admin-menu"} ulClassName={"ulClass"} className={"ham-admin-li"} links={adminLinks} />
      : <Menu navClassName={"ham-user-menu"} ulClassName={"ulClass"} className={"ham-user-li"} links={userLinks} />;
  };

  const renderProfile = () => {
    return <Profile userName={userName}/>
  }

  console.log("isLoggedIn: " + isLoggedIn)

  return (
    <>
      <header className="mainHeader">     
        <Hamburguer onClick={onMenuToggle} />        
        {isLoggedIn && renderProfile()}
      </header>

      {isMenuOpen && renderMenu()}
    </>
  );
}
