import {Link} from "react-router-dom";

const CreatePost = () => {
    return (
        <div className="CreatePost">
            <Link to="/new">Создать пост</Link>
        </div>
    );
};

export default CreatePost;