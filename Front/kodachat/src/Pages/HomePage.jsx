import "./HomePage.css";
import { Post } from "../Components/Post.jsx";
import{ Footer } from "../Components/Footer.jsx";
import profiles from "./profiles.json";

export function HomePage(){

    function getPosts(){
        return profiles.map((post, index) =>
            <Post
                key={index}
                author={post.author}
                title={post.title}
                content={post.content}
                timestamp={post.timestamp}
                likes={post.likes}
                dislikes={post.dislikes}
                comments={post.comments}
                profileImage={"/profilePictures/" + post.profileImage}
            />
        )
    }

    return(
        <div className="mainContentHomePage">
            {getPosts()}
                
            <Footer userPicture={"/profilePictures/" + profiles[0].profileImage} userName={profiles[0]?.author} />

        </div>
    )
}