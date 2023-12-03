import React, { useState } from 'react'

const formate={ username: "", email:"",password: "", password2: "" };
export default function Register() {
    const [formDetail, setFormDetail] = useState(formate);

    const onDetailChange = (event) => {
        const { name, value } = event.target;
        setFormDetail((prevFormDetail) => ({
            ...prevFormDetail,
            [name]: value,
        }));
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(formDetail);
        setFormDetail(formate);
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
                <a href="/login">Already a user?</a>
            </div>
        </div>
  )
}
