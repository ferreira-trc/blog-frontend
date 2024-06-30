import React, { useState, useEffect } from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { Comment } from '../comment/Comment.jsx';

export function CommentPost({post}) {    
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [showComments, setShowComments] = useState(false); 

    useEffect(() => {
        if (showComments) {
        fetchComments();
        }
    }, [showComments]); 

    const fetchComments = async () => {
        try {
        const response = await fetch(`http://localhost:8080/comment/post/${post.id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',          
            }
        });

        if (response.ok) {
            const data = await response.json();
            setComments(data);
        } else {
            setError('Failed to fetch comments');
        }
        } catch (error) {
        setError('An error occurred while fetching comments');
        }
    };
    
    return (
        <>
            <section className="p-section-toggle-comments">
                <Button 
                className="p-button" 
                onClick={() => setShowComments(!showComments)}
                >
                    <Icon name= {"Comment"} /> 
                </Button>
            </section>

            {showComments && (
                <>
                    <section className="p-section-comments">
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
        </>        
    );
}