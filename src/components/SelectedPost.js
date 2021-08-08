import {useState} from "react";
import EditPost from "./EditPost";
import {Link} from "react-router-dom";
import moment from 'moment';


const SelectedPost = (props) => {
    const [editMode, setEditMode] = useState(false);

    const onToggleEditMode = () => {
        setEditMode(!editMode);
    };

    const post = JSON.parse(localStorage.getItem('selectedPost'));

    const onDelete = async (event) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_URL_POSTS}/${event.target.id}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (editMode) {
        return (
            <EditPost
                {...props}
                id={post.id}
                content={post.content}
                onClose={onToggleEditMode}
            />
        )
    }

    return (
        <li className="postsListItem">
            <div className="postInfo">
                <img className="avatar" src={post.avatar} alt={post.name} />
                <div>
                    <div className="userName">{post.name}</div>
                    <span className="postDate">{moment(post.created).fromNow()}</span>
                </div>
            </div>
            <p>{post.content}</p>
            <div className="buttons">
                <button className="btn" onClick={onToggleEditMode}>Редактировать</button>
                <Link className="delete-btn" to="/" id={post.id} onClick={onDelete}>
                    Удалить
                </Link>
            </div>
        </li>
    );
};

export default SelectedPost;