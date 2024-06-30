import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../Button.jsx';

export function EditPost() {
  const { id }= useParams();  
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
        
        console.log(id)
      try {
        const response = await fetch(`http://127.0.0.1:8080/post/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const data = await response.json();          
          setTitle(data.title);
          setText(data.text);
          setCategory(data.category);
        } else {
          setError('Failed to fetch post');
        }
      } catch (error) {
        setError('An error occurred while fetching post');
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPost = { title, text, category };

    try {
      const response = await fetch(`http://127.0.0.1:8080/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(updatedPost)
      });

      if (response.ok) {
        navigate('/home');
      } else {
        setError('Failed to update post');
      }
    } catch (error) {
      setError('An error occurred while updating post');
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      {error && <p className="error">{error}</p>}      
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea
            value={text}

            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
