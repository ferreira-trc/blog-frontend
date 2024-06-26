import React, { useEffect, useState } from 'react';

export function MyProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/user/' + localStorage.getItem('id'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
        <div className="user-profile">
            <h2>User Profile</h2>
            <div>
                <strong>User Name:</strong> {user.userName}
            </div>
            <div>
                <strong>Role:</strong> {user.role}
            </div>
            
        </div>

        <div className="user-profile">
            <h2>Personal Data</h2>
                <div>
                    <strong>Name:</strong> 
                </div>
                <div>
                    <strong>Role:</strong> 
                </div>
                <div>
                    <strong>Birthdate:</strong> 
                </div>
        </div>
    </>
    
  );
}
