import {useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

const NewPost = () => {
    const textarea = useRef(null);

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
            const response = await fetch(process.env.REACT_APP_URL_POSTS, {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    id: Date.now(),
                    content: textarea.current.value,
                    avatar: 'https://i.pravatar.cc/40',
                    name: 'You'
                }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        textarea.current.focus();
    }, []);

    return (
        <div className="newPost">
            <Link to="/">
                <span className="cancel">x</span>
            </Link>
            <textarea ref={textarea} rows="10"/>
            <Link to="/" onClick={onClick}>
                <div className="CreatePost">Опубликовать</div>
            </Link>
        </div>
    );
};

export default NewPost;