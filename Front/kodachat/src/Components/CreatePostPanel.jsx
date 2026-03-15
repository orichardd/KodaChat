import "./CreatePostPanel.css"
import { useState } from "react";
import api from "../api.js";

export function CreatePostPanel({ openPanel, userPicture, userName }) {

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    function validateTitle(title) {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(title);
    }

    function handleTitleChange(newTitle) {
        if ((validateTitle(newTitle) && newTitle.length < 40) || newTitle === "") {
            setPostTitle(newTitle);
        }
    }

    function handleContentChange(newContent) {
        if (newContent.length <= 600) {
            setPostContent(newContent);
        }
    }

    async function handleSubmit() {
        if (postTitle.length < 3 || postContent.length < 3) {
            alert("Título e conteúdo não podem ser vazios.");
            return;
        }
        else {
            try {
                await api.post("/posts/post", { title: postTitle, content: postContent })
            }
            catch (error) {
                alert("Erro ao criar post: " + error.response.data.message);
                return;
            }
            alert("Post publicado com sucesso!");
            setPostTitle("");
            setPostContent("");
        }
    }

    const now = new Date();

    const formattedDate = now.toLocaleDateString("pt-BR"); // 23/12/2026
    const formattedTime = now.toLocaleTimeString("pt-BR");

    return (
        <>
            <div className="createPost"
                style={{
                    transform: openPanel == "createPost" ? "translateY(0)" : "translateY(100%)"

                }}>
                <div className="createPostContainer">
                    <div className="createPostContainerContent">
                        <div className="postHeader">
                            <div className="postAuthor">
                                <img src={userPicture} alt="Avatar" />
                                <h2 className="authorName">{userName}</h2>
                            </div>
                            <div className="postTimestamp">
                                <span>{formattedDate}</span>
                                <span>{formattedTime}</span>
                            </div>
                        </div>
                        <div className="createPostTitle">
                            <div className="postContent">

                                <input type="text" className="postInput postInputTitle" placeholder="Título  - Somente letras e números" value={postTitle} onChange={(e) => handleTitleChange(e.target.value)} />
                            </div>
                            <div className="postContent">
                                <textarea type="text" className="postInput postInputContent" placeholder="Conteudo" value={postContent} onChange={(e) => handleContentChange(e.target.value)} />
                            </div>
                            <div className="postContent">
                                <button className="submitPostButton" onClick={handleSubmit} >Publicar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}