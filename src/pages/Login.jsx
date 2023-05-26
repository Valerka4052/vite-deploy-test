import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";


export const Login = () => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth);
    const [login, setLogin] = useState({ email: '', password: '' });
    
    const sendLoginData = async (e) => {
        e.preventDefault();
        const  data = await dispatch(fetchUser(login));
        // console.log(data);
        if (!data.payload) alert('login operation failed');
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        } else { alert('login operation failed') }
  setLogin({ email: '', password: '' }); 
    };

    const hadleEmail = (e) => { setLogin(prev => ({ ...prev, email: e.target.value })) }
    const hadlePass = (e) => { setLogin(prev => ({ ...prev, password: e.target.value })) }
    
    if(data) return <Navigate to='/' />
    return (
        <div>
            <form>
                <label >email<input placeholder="email" type="email" value={login.email} onChange={(e)=>hadleEmail(e)} name="email" id="" /></label>
                <label >password<input placeholder="password" type="password" value={login.password} onChange={(e)=>hadlePass(e)} name="password" id="" /></label>
                <button type="submit" onClick={(e)=>sendLoginData(e)}>login</button>
            </form>
        </div>
    );
}