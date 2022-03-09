import '../App.css';
import {Link} from 'react-router-dom'
import React, {Component} from "react";

class NavBack extends Component {

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
                    {/*    <Link style={navStyle} to={`/home/${this.state.token}`}>*/}
                    {/*        <li>home</li>*/}
                    {/*    </Link>*/}
                </ul>
            </nav>
        );
    }
}

export default NavBack;
