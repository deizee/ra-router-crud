import {useRef, useState} from 'react';
import {Link} from "react-router-dom";

const EditPost = (props) => {
    const textarea = useRef(null);
    const [content, setContent] = useState(props.content);
    const onWriteContent = (event) => {
        setContent(event.target.value);
    };

    const onClick = (event) => {
        if (!textarea.current.value) {
            event.preventDefault();
            if (!textarea.current.classList.contains('empty')) {
                textarea.current.classList.add('empty');
                return;
            }
        }
        uploadPost();
    }

    const uploadPost = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_URL_POSTS}/${props.id}`,
                {
                method: 'PUT',
                'Content-Type': 'application/json',
                body: JSON.stringify({content}),
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="editPost">
            <h3>Редактировать пост</h3>
            <Link to="/">
                <span className="cancel">x</span>
            </Link>
            <textarea
                ref={textarea}
                rows="10"
                value={content}
                onChange={onWriteContent}
            />
            <Link to="/" onClick={onClick}>
                <div className="CreatePost">Сохранить</div>
            </Link>
        </div>
    );
};

export default EditPost;