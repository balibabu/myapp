import React, { useContext, useState } from 'react';
import './Login.css';
import AuthContext from '../../global/AuthContext';
import { Navigate } from "react-router-dom";

export default function Login() {
    const [formDetail, setFormDetail] = useState({ username: "", password: "" });
    const {login,loggedIn} = useContext(AuthContext);

    const onDetailChange = (event) => {
        const { name, value } = event.target;
        setFormDetail((prevFormDetail) => ({
            ...prevFormDetail,
            [name]: value,
        }));
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const status=await login(formDetail.username,formDetail.password);
        console.log(status);
        if(!status){
            alert("Either your username or password is wrong");
        }else{
            setFormDetail({ username: "", password: "" });
        }
    }

    if(loggedIn){
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div>
            <div className="text-center mt-4 name">
                Daily
            </div>
            <form className="p-3 mt-3" onSubmit={onSubmit}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input
                        type="text"
                        name="username"
                        id="userName"
                        placeholder="Username"
                        value={formDetail.username}
                        onChange={onDetailChange}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input
                        type="password"
                        name="password"
                        id="pwd"
                        placeholder="Password"
                        value={formDetail.password}
                        onChange={onDetailChange}
                    />
                </div>
                <button className="btn mt-3">Login</button>
            </form>
            <div className="text-center fs-6">
                <a href="/contact">Forget password?</a> or <a href="/register">Sign up</a>
            </div>
        </div>
    )
}
