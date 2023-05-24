import axios from "../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const FullPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
       const fetch = async () => {
        const { data } = await axios.get(`/posts/${id}`);
        setPost(data)
    return data
};
       fetch()
 
    }, [id]);
  console.log(post);
   
if(!post)return  <h1>Loading...</h1>
    return (
        <div><h2>Full Post page</h2>
        <div >
                    <div><img src={post.imageURL} alt={post.title} /></div>
                    <p ><b>{post.title}</b></p>
                    <p>{post.text}</p>
                    <ul>
                        {post.tags.map((tag,idx) => <li key={idx}><p>{tag}</p></li>)}
                </ul>
                <p>{post.viewsCount }</p>
            </div>
        </div>
    )
}