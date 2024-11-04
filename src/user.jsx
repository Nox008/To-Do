import { useState } from "react";
import axios from 'axios';
import './Userreg.css';

export default function Userreg() {
    const [user, setUser] = useState({});
    
    const changeValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const getPic = (e) => {
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    };

    const formdata = new FormData();
    const handleSubmit = (e) => {
        e.preventDefault();
        formdata.append("fullname", user.fname);
        formdata.append("images", user.images);
        formdata.append("email", user.email);
        formdata.append("password", user.password);

        const api = "http://localhost:5000/user/register";
        axios.post(api, formdata, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            console.log(res.data)
            alert(res.data);
        })
        .catch(err => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="user-form">
            <div className="form-container">
                <div className="form-row">
                    <div className="form-col">
                        <label>Full Name</label>
                        <input 
                            type="text"
                            name="fname"
                            onChange={changeValue}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-col">
                        <label>Upload Photo</label>
                        <input 
                            type="file"
                            name="images"
                            onChange={getPic}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-col">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            onChange={changeValue}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-col">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            onChange={changeValue}
                            required
                            className="form-input"
                        />
                    </div>
                </div>
                <div className="form-row center">
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </div>
            </div>
        </form>
    );
}
