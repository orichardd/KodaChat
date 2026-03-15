import { useState } from "react";
import { MenuBar } from "./MenuBar.jsx";
import { CreatePostPanel } from "./CreatePostPanel.jsx";
import { useEffect } from "react";
import api from "../api.js";
import "./Footer.css"

export function Footer() {

    const [openPanel, setOpenPanel] = useState(null)
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        async function getUserProfile() {
            try {
                const content = await api.post("/users/getUser")
                setUserProfile(content.data)
            } catch (error) {
                alert("Erro ao buscar perfil do usuário: ", error.response?.data)
            }
        }
        getUserProfile()

    }, [])

    const togglePanel = (panel) => {
        setOpenPanel(openPanel === panel ? null : panel);
    }

    const profilePicture = "/profilePictures/" + userProfile.picture_num + ".jpg"

    return (
        <>
            <footer className="footer">
                <div className="footerContent">
                    <div className="footerUserInfo">
                        <img src={profilePicture} alt="User Profile" className="footerProfilePicture" />
                        <div className="footerUserDetails">
                            <span className="footerUserName">{userProfile.username}</span>
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
            <CreatePostPanel openPanel={openPanel} userPicture={profilePicture} userName={userProfile.username} />
            <MenuBar openPanel={openPanel} />
        </>
    )
}