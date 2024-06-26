import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';

export function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'login': userName, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('Login bem-sucedido', data);
        localStorage.setItem("idUser", data.idUser);
        localStorage.setItem("idPerson", data.idPerson);
        localStorage.setItem("token", data.token);
        navigate('/allpost'); 
      } else {
        setError(data.message || 'Erro no login');
      }
    } catch (error) {
      console.log(userName);
      setError('Erro de rede ou servidor indisponível');
    }
  };

  return (
    <>     

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User name:</label>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    
    </>
  );
};
