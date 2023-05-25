import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";


export const Registration = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.auth);
    const [register, setRegister] = useState({ email: '', password: '', fullName: '' });
    const sendLoginData = async (e) => {
        e.preventDefault();
        const data = await dispatch(registerUser(register));
         if (!data.payload) alert('registration operation failed');
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        } else { alert('registration operation failed') }
        setRegister({ email: '', password: '', fullName: '' })
    };
    const hadleEmail = (e) => { setRegister(prev => ({ ...prev, email: e.target.value })) };
    const hadlePass = (e) => { setRegister(prev => ({ ...prev, password: e.target.value })) };
    const hadleName = (e) => { setRegister(prev => ({ ...prev, fullName: e.target.value })) };

    if (data) return <Navigate to='/' />;
    return (
        <div>
            <form>
                <label >name<input onChange={(e)=>hadleName(e)} value={register.fullName} type="text" name="name" id="" /></label>
                <label >email<input onChange={(e)=>hadleEmail(e)} value={register.email} type="email" name="email" id="" /></label>
                <label >password<input onChange={(e)=>hadlePass(e)} value={register.password} type="password" name="password" id="" /></label>
                <button type="submit" onClick={(e)=>sendLoginData(e)}>register</button>
            </form>
        </div>
    );
};