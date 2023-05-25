// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../redux/slices/auth"
export const Header = () => {
    // const [isAuth, setIsAuth] = useState(false)
    const dispatch = useDispatch()
    const handleAuth = () => {
        window.localStorage.removeItem("token")
        dispatch(logout())
    };
    const { data } = useSelector(state => state.auth);
console.log('data',data);
    return (<>
        <Link to='/'>Home</Link>
        {data!==null ? (<div>
            <Link to='/add-post'>Post create</Link>
            <button onClick={handleAuth}>logout</button>
        </div>) : (<div><div><Link to='/login'>login</Link></div>
            <div><Link to='/register'>registration</Link></div>
        </div>)}
    </>
    );
}