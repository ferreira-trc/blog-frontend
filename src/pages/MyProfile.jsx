import React, { useEffect, useState } from 'react';
import { ChangePassword } from '../components/profile/ChangePassword';
import { UserProfileBox } from '../components/profile/UserProfileBox';
import { PersonProfileBox } from '../components/profile/PersonProfileBox';

export function MyProfile() {
  const [user, setUser] = useState(null);
  const [person, setPerson] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/user/' + localStorage.getItem('idUser'), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            });

            if (response.ok) {
              const dataUser = await response.json();
              setUser(dataUser);
            } else {
              setError('Failed to fetch user data');
            }
          } catch (error) {
            setError('An error occurred while fetching user data');
        }
    };

    const fetchPersonData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/person/' + localStorage.getItem('idPerson'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const dataPerson = await response.json();
          setPerson(dataPerson);          
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
          setError('An error occurred while fetching user data');
      }
    };
    fetchPersonData();    
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
      <UserProfileBox className={"user-profile"} userName={user.userName} role={user.role}/> 
      <PersonProfileBox className={"user-profile"} personName={person.name} personEmail={person.email} personBirthDay={person.birthDay}/>       
      <ChangePassword userName={user.userName}/>
    </>
    
  );
}
