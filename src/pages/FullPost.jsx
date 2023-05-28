import { Box, Typography } from "@mui/material";
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
        fetch();
    }, [id]);
   
if(!post)return
    return (
        <Box mt={10} >
            <Box sx={{alignItems:'center'}} ><img src={!post.imageURL ? "https://upload.wikimedia.org/wikipedia/commons/9/90/No_image_available_600_x_400.svg" : `https://backend-practice-5k0t.onrender.com/${post.imageURL}`} width={600} height={400} alt={post.title} />
            <Box  sx={{mr:'auto',ml:'auto',padding:2}}>
                <Typography variant="h4" color={'black'}>{post.title}</Typography>
                 <Typography variant="body2" color={'black'}>{post.text}</Typography>
                </Box>
                </Box>
         </Box>   
    );
}
