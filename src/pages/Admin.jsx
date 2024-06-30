import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';

export function Admin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('An error occurred while fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      setError('An error occurred while deleting user');
    }
  };

  const handlePromote = async (userId) => {
    if (!window.confirm('Are you sure you want to promote this user?')) {
      return;
    }

    const role = {'role': 'admin'};

    console.log(JSON.stringify(role));
    try {
      const response = await fetch(`http://127.0.0.1:8080/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(role)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
      } else {
        setError('Failed to promote user');
      }
    } catch (error) {
      setError('An error occurred while promoting user');
    }
  };

  return (
    <>
      <div className="admin-users">
        <h2>All Users</h2>
        {error && <p className="error">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Username</th>            
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>              
                <td>{user.role}</td>
                <td>
                  <Button className={'delete-user-button'} onClick={() => handleDelete(user.id)}>Delete</Button>
                  <Button className={'promote-user-button'} onClick={() => handlePromote(user.id)}>Promote</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    
  );
}
