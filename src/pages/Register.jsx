import React, { useState } from 'react';


export function Register() {

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        birthDay: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userDTO: {
                        userName: formData.userName,
                        password: formData.password
                    },
                    personDTO: {
                        name: formData.name,
                        email: formData.email,
                        birthDay: formData.birthDay
                    }
                })
            });

            if (response.ok) {
                setSuccess('User registered successfully');
                setError('');
                setFormData({
                    userName: '',
                    password: '',
                    name: '',
                    email: '',
                    birthDay: ''
                });
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Birthday:</label>
                    <input type="date" name="birthDay" value={formData.birthDay} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

