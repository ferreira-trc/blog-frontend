import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("idUser");
    localStorage.removeItem("idPerson");
    localStorage.removeItem("token");
   
    navigate('/login');
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
}
