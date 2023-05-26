import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useCallback, useRef, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const AddPost = () => {
    const{id}=useParams()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("");
    const [header, setHeader] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(({data}) => {
                console.log(data);
                  setValue(data.text);
            setHeader(data.title);
            setTags(data.tags.join(','));
            setImage(data.imageURL);
            })
        }
      
    }, [id]);
    
    const sendFile = async (e) => {
        try {
            console.log(e.target.files);
            const formData = new FormData;
            formData.append('imageURL', e.target.files[0]);
            const data = await axios.post('/uploads', formData);
            setImage(`http://localhost:4444/${data.data.path}`);
            // console.log(data.data.path);
        } catch (error) {
            console.log(error);
        }
    }; 
    const onSubmit = async () => {
        setLoading(true)
        try {
            const post = {
                imageURL: image,
                title: header,
                text: value,
                tags: tags.split(',')
            };
console.log('id',id);
            if (id) {
                await axios.patch(`/posts/${id}`, post);
                navigate(`/posts/${id}`);
            } else {
                const { data } = await axios.post("/posts", post);
                navigate(`/posts/${data._id}`)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);
    if(loading)return <h1>Loading.....</h1>
    return (
        <>
            <div><h2>Add Post page</h2></div>
            <div><input ref={inputRef} type="file" name="imageURL" id="" onChange={(e) => sendFile(e)} /></div>
            {image && <div><button onClick={() => setImage('')} >delete image</button><img src={image} alt="upload-image" width={300} height={300} /></div>}
            <div>
                <label >заголовок поста<input value={header} onChange={(e) => setHeader(e.target.value)} type="text" placeholder="заголовок" /></label>
            </div>
            <div>
                <label >tags<input value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder="tags" /></label>
            </div>
            <div>
                <SimpleMdeReact value={value} onChange={onChange} />
            </div>
            <button onClick={onSubmit}>{id ? 'save post' : 'send post'}</button>
        </>
    );
}