import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Kontak ku</h1>
                <div className="center">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png"
                    alt="logo" width={350} />
                </div>
                <br />
                <div className="center">
                    <Link to="/register" className="btn">Register</Link>
                    <Link to="/login" className="btn">Login</Link>
                </div>
            </div>
        );
    }
}

export default Landing;
