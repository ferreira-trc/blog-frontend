import React, { useState, useEffect } from 'react';
import { Post } from '../components/post/Post';

export function LandingPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState('default'); // Estado para controle da ordenação

    const fetchPosts = async (order = 'default') => {
        try {
            setLoading(true);
            const url = order === 'cron' 
                ? 'http://127.0.0.1:8080/post?order=cron' 
                : 'http://127.0.0.1:8080/post';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar os posts');
            }
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(order);
    }, [order]); // Dependência para refazer a requisição quando a ordem mudar

    const handleOrderChange = () => {
        setOrder((prevOrder) => (prevOrder === 'default' ? 'cron' : 'default'));
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <>
            <button onClick={handleOrderChange}>Ordenar por ordem cronológica</button>
            <main>
                {posts.map((p) => (
                    <Post post={p} key={p.id} />
                ))}
            </main>
        </>
    );
}
