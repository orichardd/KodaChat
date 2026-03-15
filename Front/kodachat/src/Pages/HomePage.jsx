import "./HomePage.css";
import { Post } from "../Components/Post.jsx";
import { Footer } from "../Components/Footer.jsx";
import { useState, useEffect } from "react";
import api from "../api.js";
export function HomePage() {

    const [posts, setPosts] = useState([]);

    async function getPosts(){
        try{
            await api.get("/posts/getall").then((response) => {
                setPosts(response.data);
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
                likes="0"
                dislikes="0"
                profileImage={"/profilePictures/" + post.picture_num + ".jpg"}
                id={post.id}
            />
        )
    }

    return (
        <div className="mainContentHomePage">
            {transformPosts()}
            <Footer />

        </div>
    )
}