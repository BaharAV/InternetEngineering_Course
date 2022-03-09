import '../App.css';
import {Link} from 'react-router-dom'
import React from "react";

function Nav() {

    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    };

    return (
        <nav>
            <h3>Twitter!</h3>
            <ul id="enter-nav">
                <Link style={navStyle} to="/login">
                    <li>login</li>
                </Link>
                <Link style={navStyle} to="/signup">
                    <li>signup</li>
                </Link>
                <Link style={navStyle} to="/searchout">
                    <li>search</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
