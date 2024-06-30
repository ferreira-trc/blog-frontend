import { Post } from '../post/Post.jsx';
import { CommentForm } from '../comment/CommentForm.jsx';
import { CommentPost } from '../comment/CommentPost.jsx';
import React, { useState, useEffect } from 'react';


export function PostWithComments({post}) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');    

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        const comment = { text: commentText, postId: post.id };
    
        try {
          const response = await fetch('http://localhost:8080/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(comment)
          });
    
          if (response.ok) {
            const newComment = await response.json();
            setComments([...comments, newComment]); 
            setCommentText('');
          } else {
            setError('Failed to submit comment');
          }
        } catch (error) {
          setError('An error occurred while submitting comment');
        }
    };

    return (
        <>
            <article className="p-article" key={post.id}>
                <Post post={post} key={post.id} />
                <hr />
                <CommentForm 
                classNameSection="p-div-comment-form"
                classNameButton="p-button-submit"
                onSubmit={handleCommentSubmit}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                />
                <CommentPost post={post}/>
            </article>

            {error && <p className="error">{error}</p>}
                    
        </>
    );
}