import { useState } from "react";
import { MenuBar } from "./MenuBar.jsx";
import "./Footer.css"

export function Footer({ userPicture, userName }) {

    const [openPanel, setOpenPanel] = useState(null)

    const togglePanel = (panel) => {
        setOpenPanel(openPanel === panel ? null : panel);
    }

    return (
        <>
            <footer className="footer">
                <div className="footerContent">
                    <div className="footerUserInfo">
                        <img src={userPicture} alt="User Profile" className="footerProfilePicture" />
                        <div className="footerUserDetails">
                            <span className="footerUserName">{userName}</span>
                            <p className="onlineP">· online</p>
                        </div>
                    </div>
                    <div className="footerButtons">
                        <input type="checkbox"
                            className="footerButton createPostCheckBox"
                            onChange={() =>
                                togglePanel('createPost')
                            } />
                        <input type="checkbox"
                            className="footerButton menuCheckBox"
                            checked={openPanel == "menu"}
                            onChange={() =>
                                togglePanel('menu')
                            } />
                    </div>



                </div>
            </footer>
            <div className="screenCover" style={{
                opacity: openPanel == "menu" || openPanel == "createPost" ? 1 : 0,
                pointerEvents: openPanel == "menu" || openPanel == "createPost" ? "all" : "none"

            }}>
            </div>
            <div className="createPost"
                style={{
                    transform: openPanel == "createPost" ? "translateY(0)" : "translateY(100%)"

                }}
            >
                <div className="createPostContainer">
                    <div className="createPostContainerContent">
                        <div className="postHeader">
                            <div className="postAuthor">
                                <img src={userPicture} alt="Avatar" />
                                <h2 className="authorName">{userName}</h2>
                            </div>
                            <div className="postTimestamp">
                                <span>23/12/2026</span>
                                <span>23:23:23</span>
                            </div>
                        </div>
                        <div className="createPostTitle">
                            <div className="postContent">

                                <input type="text" className="postInput postInputTitle" placeholder="Título" />
                            </div>
                            <div className="postContent">
                                <textarea type="text" className="postInput postInputContent" placeholder="Conteudo" />
                            </div>
                            <div className="postContent">
                                <button className="submitPostButton">Publicar</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}