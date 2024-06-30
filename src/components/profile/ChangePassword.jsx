import React, { useState } from 'react';
import { Button } from '../Button';


export function ChangePassword({userName}) {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As novas senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ userName, password })
      });

      if (response.ok) {
        setSuccess('Senha alterada com sucesso.');
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
        
      } else {
        const data = await response.json();
        setError(data.message || 'Falha ao mudar a senha.');
      }
    } catch (error) {
      setError('Erro de rede ou servidor indisponível.');
    }
  };

  return (
    <>
      <div className="user-change-password">
        <h2>Mudar Senha</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Senha Atual:        
            </label>
            <input
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              Nova Senha:
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              Confirmar Nova Senha:          
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <Button type={"submit"} className={"change-password-button"}>Mudar Senha</Button>        
        </form>
      </div>    
    </>
  );
};
