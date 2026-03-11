import "./Post.css";

export function Post({ author, title, content, timestamp, likes, dislikes, comments, profileImage }) {

    const [date, time] = timestamp.split(" ");

    return (
        <div className="post">
            
            <div className="postContainer">
                <div className="postHeader">
                <div className="postAuthor">
                    <img src={profileImage} alt="Avatar" />
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
                    <div className="bottomButton"><img src="/like.png" alt="" /><h3>{dislikes}</h3></div>
                <div className="bottomButton"><img src="/comment.png" alt="" /><h3>{comments}</h3></div>
                </div>
                <div className="bottomButton"><img src="/options.png" alt="" /></div>
            </div>
            </div>
        </div>
    );
}