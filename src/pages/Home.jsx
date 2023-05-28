
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination} from "@mui/material";
import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { ferchPosts } from "../redux/slices/post";

const itemsPerPage = 6;
export const Home = () => {
    const { items, postsArrayLength } = useSelector(state => state.posts.posts);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ferchPosts({ page: page, itemsPerPage }));
    }, [dispatch, page]);

    const hadlePage = (event, value) => {
        setPage(value);
    };
    const totalPages = Math.ceil(postsArrayLength / itemsPerPage);
    if (!items) return

    return (
        <Box>
            <Box style={{ width: '100%', display: 'flex', flexDirection: 'row',flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', gap: 30, paddingTop: 30 }}>
                {items.map(item => (<Post item={item} key={item._id} />))}
            </Box>
            <Box sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", alignItems: "center", }} >
                <Pagination count={totalPages} onChange={hadlePage} page={page} variant="outlined" color="secondary" > </Pagination>
            </Box>
        </Box>
    );
};
