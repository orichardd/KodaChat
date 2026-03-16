import "./CommentsPage.css"
import { Post } from "../Components/Post.jsx"
import { Footer } from "../Components/Footer.jsx"
import { LoadingScreen } from "../Components/LoadingScreen.jsx"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../Components/Comment.jsx";
import api from "../api.js";

export function CommentsPage() {

    const [post, setPost] = useState({});
    const { postId } = useParams();

    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    function handleContentChange(value) {
        if (commentContent.length <= 500) {
            setCommentContent(value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const [postRes, commentsRes] = await Promise.all([
                    api.get("/posts/" + postId),
                    api.get("/comments/" + postId)
                ]);
                setPost(postRes.data);
                setComments(commentsRes.data);
            } catch (error) {
                console.log(error.response?.data);
            } finally {
                setIsFading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        })();
    }, [postId]);

    async function postComment() {
        if (commentContent.trim() === "") {
            alert("O comentário não pode ser vazio.");
            return;
        }

        try {
            await api.post("/comments/comment/" + postId, {
                content: commentContent
            });
            setCommentContent("");

            const commentsResponse = await api.get("/comments/" + postId);
            setComments(commentsResponse.data);
            alert("Comentário adicionado com sucesso!");
        } catch (error) {
            console.log(error.response?.data);
            alert("Erro ao criar comentário: " + error.response?.data?.message);
        }
    }

    return (
        <>
            {loading && <LoadingScreen fading={isFading} />}
            {!loading && (
                <div className="commentsPageContainer">
                    <div>
                        <Post
                            key={post.id}
                            author={post.username}
                            title={post.title}
                            content={post.content}
                            timestamp={post.date}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            comments={post.comments}
                            profileImage={"/profilePictures/" + post.picture_num + ".png"}
                            id={post.id}
                        />
                    </div>
                    <div className="createComment">
                        <div className="commentContainer">
                            <div className="commentContent">
                                <textarea type="text" className="commentInputContent commentContent" placeholder="Conteudo" value={commentContent} onChange={(e) => handleContentChange(e.target.value)} />
                            </div>
                            <div className="commentContent">
                                <div>
                                    <button className="submitPostButton" onClick={postComment}>
                                        Adicionar Comentário
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="commentsContainer">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                author={comment.username}
                                content={comment.content}
                                timestamp={comment.date}
                                likes={"0"}
                                dislikes={"0"}
                                id={comment.id}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}