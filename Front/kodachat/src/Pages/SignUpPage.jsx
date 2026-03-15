import "./SignUpPage.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export function SignUpPage() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedPicture, setSelectedPicture] = useState(null);
    const navigate = useNavigate();

    const profilePictures = [["/profilePictures/1.webp", 1], ["/profilePictures/2.webp", 2], ["/profilePictures/3.webp", 3], ["/profilePictures/4.webp", 4], ["/profilePictures/5.webp", 5], ["/profilePictures/6.webp", 6], ["/profilePictures/7.webp", 7], ["/profilePictures/8.webp", 8], ["/profilePictures/9.webp", 9], ["/profilePictures/10.webp", 10], ["/profilePictures/11.webp", 11], ["/profilePictures/12.webp", 12], ["/profilePictures/13.webp", 13], ["/profilePictures/14.webp", 14], ["/profilePictures/15.jpg", 15], ["/profilePictures/16.jpg", 16], ["/profilePictures/17.jpg", 17], ["/profilePictures/18.jpg", 18], ["/profilePictures/19.jpg", 19], ["/profilePictures/20.jpg", 20], ["/profilePictures/21.jpg", 21], ["/profilePictures/22.jpg", 22]];

    function validateUsername(username) {
        const regex = /^[a-zA-Z0-9_\s]+$/;
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

    async function createAccount(){
        if(userName.length < 3 || password.length < 3){
            alert("Usuário e senha devem conter pelo menos 3 caracteres.");
            return;
        }
        if(selectedPicture == null){
            alert("Por favor, selecione uma foto de perfil.");
            return;
        }
        setUsername("");
        setPassword("");
        setSelectedPicture(null);

        try{
            await api.post("/users/signup", {username: userName, password: password, picture_num: selectedPicture});
            alert("Conta criada com sucesso! Faça login para continuar.");
        } catch (error) {
            alert("Erro ao criar conta: " + error.response.data.message);
        }
        navigate("/login")
    }

    return (
        <>
            <div className="SMainContent">
                <div className="mainLoginContent">
                    <div className="loginTitle">
                        <h3>Cadastrar-se</h3>
                    </div>
                    <div className="UserCredentials">
                        <div className='inputContainer'>
                            <input className='loginInput Username' type="text" placeholder="Novo usuário" value={userName} onChange={(e) => handleUsernameChange(e.target.value)} />
                            <input className='loginInput Password' type="password" placeholder="Senha" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
                        </div>
                        <div className="pictureChoiceContainer">
                            <h2>Escolha sua foto de perfil</h2>
                            <ul className="pictureChoiceUl">
                                {profilePictures.map((pPicture) => (
                                    <li key={pPicture[1]} className="profilePictureChoice">
                                        <label>
                                            <input type="radio" name="profilePicture" value={pPicture[1]} onChange={() => setSelectedPicture(pPicture[1])} />
                                            <img src={pPicture[0]} alt="" />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="loginButtons" onClick={createAccount}>
                            <button className="loginB loginButton">Criar Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}