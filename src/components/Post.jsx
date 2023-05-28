/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/slices/post";
import { Link } from "react-router-dom";
import { Button, Card, CardActionArea, CardActions, CardMedia,  Typography } from "@mui/material";


export const Post = ({ item }) => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.auth);
    
    let sliced = item.text.slice(0, 70);
    if (sliced.length < item.text.length) { sliced += '...'; }
    
    return (
        <Card sx={{ width: '800px' }} >
            <CardActionArea component={Link} to={`/posts/${item._id}`} >
                <CardMedia
                    component="img"
                    width="600"
                    image={!item.imageURL ? "https://upload.wikimedia.org/wikipedia/commons/9/90/No_image_available_600_x_400.svg" : `https://backend-practice-5k0t.onrender.com/${item.imageURL}`}
                    alt={item.title}
                />
                <Typography gutterBottom variant="h5" component="div">{item.title}</Typography>
                <Typography style={{ padding: 10 }} variant="body2" color="text.secondary">{sliced}</Typography>
                {/* <ul>
                        {item.tags.map((tag, idx) => <li key={idx}><p>{tag}</p></li>)}
                            </ul> */}
                <Typography variant="body" color="text.secondary">Views {item.viewsCount}</Typography>
            </CardActionArea>
            <CardActions>
                {data?.id === item.user._id && <><Button size="small" color="primary" onClick={() => dispatch(deletePost(item._id))} >delete Post</Button>
                    <Button size="small" color="primary" component={Link} to={`/posts/${item._id}/edit`}  >edit post</Button></>}
            </CardActions>
        </Card>
    );
};