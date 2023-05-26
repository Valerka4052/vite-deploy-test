import { useEffect } from "react";
// import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, ferchPosts } from "../redux/slices/post";
import { Link } from "react-router-dom";

export const Home = () => {
    const { items } = useSelector(state => state.posts.posts);
    const { data } = useSelector(state => state.auth);
    console.log('items',items);
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ferchPosts());
    }, [dispatch]);

    if (!items) return <h1>Loading...</h1>
    return (
        <div><h1>Home page</h1>
            <ul>
                {items.map(item => (<li key={item._id}>
                    <div><img src={item.imageURL} alt={item.title} /></div>
                    <Link to={`/posts/${item._id}`}><b>{item.title}</b></Link>
                    <p>{item.text}</p>
                    <ul>
                        {item.tags.map((tag, idx) => <li key={idx}><p>{tag}</p></li>)}
                        <p>{item.viewsCount}</p>
                        <button disabled={data?.id !== item.user._id} onClick={() => dispatch(deletePost(item._id))} >delete Post</button>
                        <Link to={`/posts/${item._id}/edit`}  >edit post</Link>
                    </ul>
                </li>))}
            </ul>
        </div>
    );
};