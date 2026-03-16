import './LoginPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api.js';

export function LoginPage() {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function validateUsername(username) {
        const regex = /^[a-z0-9_\s]+$/;
        return regex.test(username);
    }

    function handleUsernameChange(newUsername) {
        if ((validateUsername(newUsername) && newUsername.length < 20) || newUsername === "") {
            setUsername(newUsername);
        }
    }

    function handlePasswordChange(newPassword) {
        if (newPassword.length <= 20) {
            setPassword(newPassword);
        }
    }

    async function login(userName, password){
        try{
            const response = await api.post("/auth/login", {username: userName, password: password});
            const token = response.data.token;
            localStorage.setItem("jwt", token);
            localStorage.setItem("username", userName);
            navigate("/");

        } catch (error) {
            alert("Detalhes do erro: " + error.response.data.message);
        }
    }

    return (
    <>
        <div className="MainContent">
            <div className="mainLoginContent">
                <div className="loginTitle">
                    <img src="/logo.png" alt="" />
                    <h3 className='loginText'>KodaChat</h3>
                </div>
                <div className="UserCredentials">
                    <div className='inputContainer'>
                        <input className='loginInput Username' type="text" placeholder="Usuário" value={userName} onChange={(e) => handleUsernameChange(e.target.value)} />
                        <input className='loginInput Password' type="password" placeholder="Senha" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
                    </div>
                    <div className="loginButtons">
                        <button className="loginB loginButton" onClick={() => login(userName, password)}>
                            Login
                        </button>
                        <Link to="/cadastro" className="loginB registerButton">
                            Registrar 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}