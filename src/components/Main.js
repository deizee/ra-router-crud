import CreatePost from "./CreatePost";
import useJsonFetch from '../hook/useJsonFetch';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Main = () => {
    const [loading, error, data] = useJsonFetch(process.env.REACT_APP_URL_POSTS);
    const onClick = (event) => {
        localStorage.setItem('selectedPost', event.target.closest('a').dataset.data);
    };

    return (
        <div>
            <CreatePost />
            {loading}
            {error && <div>{error.message}</div>}
            {data && (
                <ul className="postsList">
                    {data.map((data) => (
                        <Link
                            to={`/posts/${data.id}`}
                            key={String(data.id)}
                            data-data={JSON.stringify(data)}
                            onClick={onClick}
                        >
                            <li className="postsListItem">
                                <div className="postInfo">
                                    <img className="avatar" src={data.avatar} alt={data.name} />
                                    <div>
                                        <div className="userName">{data.name}</div>
                                        <span className="postDate">{moment(data.created).fromNow()}</span>
                                    </div>
                                </div>
                                <p>{data.content}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Main;