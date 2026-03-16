import "./ProfilePage.css"
import { Post } from "../Components/Post.jsx"
import { Footer } from "../Components/Footer.jsx"
import { LoadingScreen } from "../Components/LoadingScreen.jsx"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export function ProfilePage() {
    const { username } = useParams();

    const [userProfile, setUserProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const user = await api.get("/users/getUser/" + username);
                setUserProfile(user.data);
            } catch (error) {
                console.log(error.response?.data);
            }
            try {
                const userPosts = await api.get("/posts/getposts/" + username);
                setPosts(userPosts.data);
            } catch (error) {
                console.log(error.response?.data);
            } finally {
                setIsFading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        })();
    }, [username]);

    const profilePicture = "/profilePictures/" + userProfile.picture_num + ".png"

    function transformPosts() {
        return posts.map((post) => (
            <Post
                key={post.id}
                author={post.username}
                title={post.title}
                content={post.content}
                timestamp={post.date}
                likes="0"
                dislikes="0"
                profileImage={"/profilePictures/" + post.picture_num + ".png"}
                id={post.id}
            />
        ))
    }

    return (
        <>
            {loading && <LoadingScreen fading={isFading} />}
            {!loading && (
                <div className="profileScreen">
                    <div className="profilePageContainer">
                        <div className="profileContent">
                            <img src={profilePicture} alt="Profile Picture" className="profilePicture" />
                            <h3>{userProfile.username}</h3>
                            <div className="profileInfo">
                                <p>Criado em:</p>
                                <p>{userProfile.created_date?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profilePageContainer">
                        {transformPosts()}
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}