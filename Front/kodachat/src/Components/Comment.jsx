import "./Comment.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export function Comment({ author, content, timestamp, id }) {

    const [date, time] = timestamp?.split(" ") || [" ", ""];
    const [userProfile, setUserProfile] = useState({});

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [reacting, setReacting] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("/users/getUser/" + author);
                setUserProfile(response.data);

                const reactionResponse = await api.get("/reaction/comment/" + id);
                setLikes(reactionResponse.data.Likes);
                setDislikes(reactionResponse.data.Dislikes);
            } catch (error) {
                console.log(error.response?.data);
            }
        })();
    }, [author, id]);

    async function Like() {
        if (reacting) return;
        setReacting(true);
        try {
            await api.post("/reaction/comment/" + id, {}, {
                headers: { reactionType: "LIKE" }
            });
            const reactionResponse = await api.get("/reaction/comment/" + id);
            setLikes(reactionResponse.data.Likes);
            setDislikes(reactionResponse.data.Dislikes);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setReacting(false);
        }
    }

    async function Dislike() {
        if (reacting) return;
        setReacting(true);
        try {
            await api.post("/reaction/comment/" + id, {}, {
                headers: { reactionType: "DISLIKE" }
            });
            const reactionResponse = await api.get("/reaction/comment/" + id);
            setLikes(reactionResponse.data.Likes);
            setDislikes(reactionResponse.data.Dislikes);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setReacting(false);
        }
    }

    return (
        <div className="post">
            <div className="postContainer">
                <div className="postHeader" style={author === "cristo_nii" ? { backgroundColor: "#76009b", color: "white" } : {}}>
                    <div className="postAuthor">
                        <Link to={"/perfil/" + author} className="authorProfileLink">
                            <img src={"/profilePictures/" + userProfile.picture_num + ".png"} alt="Avatar" />
                        </Link>
                        <h2 className="authorName">{author}</h2>
                    </div>
                    <div className="postTimestamp">
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                </div>
                <div className="postContent">
                    <div className="postText">{content}</div>
                </div>
                <div className="bottomContainer">
                    <div className="bottomContainerMain">
                        <div className="bottomButton" onClick={Like}><img src="/like.png" alt="" /><h3>{likes}</h3></div>
                        <div className="bottomButton dislike" onClick={Dislike}><img src="/like.png" alt="" /><h3>{dislikes}</h3></div>
                    </div>
                    <div className="bottomButton"><img src="/options.png" alt="" /></div>
                </div>
            </div>
        </div>
    );
}