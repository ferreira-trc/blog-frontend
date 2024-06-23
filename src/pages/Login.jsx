import React, { useState } from 'react';

export function Login() {


  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Aqui você faria a requisição para o backend
    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login bem-sucedido', data);
        // Armazene o token ou redirecione o usuário
      } else {
        setError(data.message || 'Erro no login');
      }
    } catch (error) {
      setError('Erro de rede ou servidor indisponível');
    }
  };

  return (
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
  );
};


