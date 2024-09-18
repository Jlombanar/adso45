import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/register', { email, password });
            setMessage(response.data.message);
            alert('Registro exitoso');
            navigate('/login', { replace: true });
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error al registrar el usuario');
            }
        }
    }

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo Electrónico:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Registro</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
