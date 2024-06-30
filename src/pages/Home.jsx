import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Post } from '../components/post/Post.jsx';
import { CommentPost } from '../components/comment/CommentPost.jsx';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/post/author/${localStorage.getItem('idUser')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred while fetching posts');
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) {
      return;
    }
    
    try {
      const response = await fetch(`http://127.0.0.1:8080/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        setError('Failed to delete post');
      }
    } catch (error) {
      setError('An error occurred while deleting post');
    }
  };

  return (
    <div className="home">
      <h2>My Posts</h2>
      {error && <p className="error">{error}</p>}
      <main className='posts-container'>
        {posts.map(post => (
          <article className="p-article" key={post.id}>
            <section className='button-section'>
              <Button className={'edit-button'} onClick={() => handleEdit(post.id)}>Edit</Button>
              <Button className={'delete-button'} onClick={() => handleDelete(post.id)}>Delete</Button> 

            </section>
              <Post post={post} />
              <CommentPost post={post}/>            
          </article>
        ))}
      </main>
    </div>
  );
}
