import React, {useState, useEffect} from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar"


function Post({username, caption, ImageUrl}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const postComment = (event) => {

    }

    return (
        <div className = "post">
            <div className = "post_tolgoi">
                <Avatar
                    className = "post_avatar"
                    alt = 'User'
                    src = "/static/images/avatar/1.jpg" 
                />

                <h4>{username}</h4>
            </div>
            
            <img className = "post_zurag" src={ImageUrl} alt= ""></img>

            <h5 className = "post_text"><strong>{username}</strong> {caption}</h5>

            <div className = "post_comments">
                {comments.map((comment) => (
                    <p><strong>{comment.username}</strong>{comment.text}</p>
                ))}
            </div>

            <form className = "post_commentBox">
                <input 
                    className = "post_input"
                    type = "text"
                    placeholder = "Add a comment..."
                    value = {comment}
                    onChange ={(e) => setComment(e.target.value)}
                />
                <button 
                    disabled = {!comment}
                    className = "post_towch"
                    type = "submit"
                    onClick = {postComment}    
                >POST</button>
            </form>
        </div>
    )
}

export default Post