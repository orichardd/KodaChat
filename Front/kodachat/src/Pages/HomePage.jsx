import "./HomePage.css";
import { Post } from "../Components/Post.jsx";
import { Footer } from "../Components/Footer.jsx";
import { useState, useEffect } from "react";
import { LoadingScreen } from "../Components/LoadingScreen.jsx";
import api from "../api.js";
export function HomePage() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    async function getPosts() {
    try {
        await api.get("/posts/getall").then((response) => {
            setPosts(response.data);
            const shuffled = [...response.data].sort(() => Math.random() - 0.5);
            setPosts(shuffled);

            setIsFading(true);
            setTimeout(() => {
                setLoading(false); 
            }, 500); 
        });
    } catch (error) {
        alert("Erro ao buscar posts: " + error.response.data.message);
    }
}


    useEffect(() => {
        getPosts();
    }, []);

    function transformPosts() {
        return posts.map((post) =>
            <Post
                key={post.id}
                author={post.username}
                title={post.title}
                content={post.content}
                timestamp={post.date}
                profileImage={"/profilePictures/" + post.picture_num + ".png"}
                id={post.id}
            />
        )
    }

    return (
    <div className="mainContentHomePage">
        {loading && <LoadingScreen fading={isFading} />}
        {!loading && transformPosts()}
        <Footer />
    </div>
)
}