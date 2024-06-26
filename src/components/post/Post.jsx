import React, { useState, useEffect } from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { Comment } from '../comment/Comment.jsx';
import { CommentForm } from '../comment/CommentForm.jsx';

export function Post({ post }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [showComments, setShowComments] = useState(false); // Estado para controlar a visibilidade dos comentários

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]); // Atualiza os comentários apenas quando showComments mudar

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/comment/post/${post.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data); // Define os comentários no estado
      } else {
        setError('Failed to fetch comments');
      }
    } catch (error) {
      setError('An error occurred while fetching comments');
    }
  };

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
        <article className="lp-article" key={post.id}>
            <section className="lp-section-title">
                <h2>{post.title}</h2>
            </section>

            <section className="lp-section-author">
                <h3>{post.authorUserName}</h3>
            </section>

            <section className="lp-section-category">
                <h6>{post.category}</h6>
            </section>

            <section className="lp-body">
                <p>{post.text}</p>
            </section>            

            <CommentForm 
            classNameSection="lp-section-comment-form"
            classNameButton="lp-button-submit"
            onSubmit={handleCommentSubmit}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            />

            <section className="lp-section-toggle-comments">
                <Button 
                className="lp-button" 
                onClick={() => setShowComments(!showComments)}
                >
                    <Icon name={showComments ? "arrow-up" : "arrow-down"} /> {showComments ? "Hide Comments" : "Show Comments"}
                </Button>
            </section>

            {showComments && (
                <>
                    <section className="lp-section-comments">
                        <h4>Comments:</h4>
                        <ul>
                        {comments.map(comment => (
                            <Comment 
                            key={comment.id}
                            id= {comment.id}
                            authorUserName= {comment.authorUserName}
                            commentContent= {comment.commentContent}
                            />
                        ))}
                        </ul>
                    </section>

                    {error && <p className="error">{error}</p>}
                </>
            )}
        </article>
  );
}

