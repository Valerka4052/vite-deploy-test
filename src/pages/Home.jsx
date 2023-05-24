import { useEffect } from "react";
// import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { ferchPosts } from "../redux/slices/post";
import { Link } from "react-router-dom";

export const Home = () => {
    const { items } = useSelector(state => state.posts.posts);
    console.log(items);
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ferchPosts())
        }, [dispatch]);
    if(!items) return <h1>Loading...</h1>
    return (
        <div><h1>Home page</h1>
            <ul>
                {items.map(item => (<li key={item._id}>
                    <div><img src={item.imageURL} alt={item.title} /></div>
                    <Link to={`/posts/${item._id}`}><b>{item.title}</b></Link>
                    <p>{item.text}</p>
                    <ul>
                        {item.tags.map((tag, idx) => <li key={idx}><p>{tag}</p></li>)}
                        <p>{ item.viewsCount}</p>
                        </ul>
            </li>))}    
            </ul>
            
        </div>
    )
}