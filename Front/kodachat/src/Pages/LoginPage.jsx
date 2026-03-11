import './LoginPage.css';

export function LoginPage() {
    return (
    <>
        <div className="MainContent">
            <div className="mainLoginContent">
                <div className="loginTitle">
                    <h3>Login / Cadastrar-se</h3>
                </div>
                <div className="UserCredentials">
                    <div className='inputContainer'>
                        <input className='loginInput Username' type="text" placeholder="Usuário" />
                        <input className='loginInput Password' type="password" placeholder="Senha" />
                    </div>
                    <div className="loginButtons">
                        <button className="loginB loginButton">Login</button>
                        <button className="loginB registerButton">
                            Register 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}