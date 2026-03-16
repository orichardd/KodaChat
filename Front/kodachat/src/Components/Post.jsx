import "./Post.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export function Post({ author, title, content, timestamp, likes, dislikes, profileImage, id }) {

    const [date, time] = timestamp?.split(" ") || [" ", ""];

    const[comments, setComments] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("/comments/getcount/" + id);
                setComments(response.data);
            } catch (error) {
                console.log(error.response?.data);
            }
        })();
    }, [id]);

    return (
        <div className="post">

            <div className="postContainer">
                <div className="postHeader" style={author === "cristo_nii" ? { backgroundColor: "#76009b", color: "white" } : {}}>
                    <div className="postAuthor">

                        <Link to={"/perfil/" + author} className="authorProfileLink">
                            <img src={profileImage} alt="Avatar" />
                        </Link>
                        <h2 className="authorName">{author}</h2>
                    </div>
                    <div className="postTimestamp">
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                </div>
                <div className="postContent">
                    <div className="postTitle">{title}</div>
                    <div className="separateLine" />
                    <div className="postText">{content}</div>
                </div>
                <div className="bottomContainer">
                    <div className="bottomContainerMain">
                        <div className="bottomButton"><img src="/like.png" alt="" /><h3>{likes}</h3></div>
                        <div className="bottomButton dislike"><img src="/like.png" alt="" /><h3>{dislikes}</h3></div>
                        <Link to={`/comentarios/` + id} className="bottomButton">
                            <img src="/comment.png" alt="" />
                            <h3>{comments}</h3>
                        </Link>
                    </div>
                    <div className="bottomButton"><img src="/options.png" alt="" /></div>
                </div>
            </div>
        </div>
    );
}