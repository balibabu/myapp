import React, { useContext, useState } from 'react'
import AuthContext from '../../global/AuthContext';
import { Register } from '../../http/Auth';
import { Link, Navigate } from 'react-router-dom';

const formate = { username: "", email: "", password: "", password2: "" };
export default function RegisterPage() {
    const [formDetail, setFormDetail] = useState(formate);
    const {login,loggedIn} = useContext(AuthContext);

    const onDetailChange = (event) => {
        const { name, value } = event.target;
        setFormDetail((prevFormDetail) => ({
            ...prevFormDetail,
            [name]: value,
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!formDetail.username) {
            alert('username cant be empty');
            return;
        } else if (formDetail.password !== formDetail.password2) {
            alert('password didnt matched');
            return;
        }
        // console.log(formDetail);
        const status=await Register(formDetail.username,formDetail.email,formDetail.password);
        if(status){
            login(formDetail.username,formDetail.password);
        }else{
            return;
        }

        setFormDetail(formate);
    }

    if (loggedIn) {
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
                    <span className=""></span>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email address"
                        value={formDetail.email}
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
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input
                        type="password"
                        name="password2"
                        id="pwd2"
                        placeholder="Re-type Password"
                        value={formDetail.password2}
                        onChange={onDetailChange}
                    />
                </div>
                <button className="btn mt-3">Sign up</button>
            </form>
            <div className="text-center fs-6">
                <Link to="/login">Already a user?</Link>
            </div>
        </div>
    )
}
