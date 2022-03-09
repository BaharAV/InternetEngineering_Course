import '../App.css';
import {Link} from 'react-router-dom'
import React, {Component} from "react";

class NavIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        }
    }

    render() {
        const navStyle = {
            color: 'white',
            textDecoration: 'none'
        };
        return (
            <nav>
                <h3>Twitter!</h3>
                <ul className="nav-links">
                    <Link style={navStyle} to={`/home/${this.state.token}`}>
                        <li>home</li>
                    </Link>
                    <Link style={navStyle} to={`/timeline/${this.state.token}`}>
                        <li>timeline</li>
                    </Link>
                    <Link style={navStyle} to={`/maketweets/${this.state.token}`}>
                        <li>tweet</li>
                    </Link>
                    <Link style={navStyle} to={`/followers/${this.state.token}`}>
                        <li>followers</li>
                    </Link>
                    <Link style={navStyle} to={`/followings/${this.state.token}`}>
                        <li>followings</li>
                    </Link>
                    <Link style={navStyle} to={`/notifications/${this.state.token}`}>
                        <li>notifications</li>
                    </Link>
                    <Link style={navStyle} to={`/profile/${this.state.token}`}>
                        <li>profile</li>
                    </Link>
                    <Link style={navStyle} to={`/search/${this.state.token}`}>
                        <li>search</li>
                    </Link>
                    <Link style={navStyle} to={`/trends/${this.state.token}`}>
                        <li>trends</li>
                    </Link>
                    <Link style={navStyle} to={`/`}>
                        <li>logout</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default NavIn;
