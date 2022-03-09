import '../App.css';
import {Link} from "react-router-dom";
import React, {Component} from "react";
import Nav from '../Nav/Nav';
import '../config';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            id: '',
            token: ''
        }
    }

    give_username = username => {
        this.setState({username: username});
    }
    give_password = password => {
        this.setState({password: password});
    }

    login = async () => {
        await fetch('http://localhost:9098/users/login', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => {
            var ok = response.status
            if (ok === 200) {
                response.json().then(json => {
                    document.getElementById("signup-from-login").style.display = "none";
                    document.getElementById("div-to-submit-in-login").style.display = "none";
                    document.getElementById("username").style.display = "none";
                    document.getElementById("password").style.display = "none";
                    document.getElementById("div-to-enter-in-login").style.display = "inline";
                    document.getElementById("div-to-enter-in-login-wellcome").style.display = "inline";
                    this.setState({token: json.token}, () => {
                        // console.log(this.state.token)
                    })
                    // global.config.token = json.token
                    // console.log(global.config.token)
                })
            } else {
                alert("wrong information!")
            }
        })
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="div-for-name">
                    <input placeholder="username" id="username" onChange={
                        event => this.give_username(event.target.value)
                    }/>
                </div>
                <div>
                    <input placeholder="password" type="password" id="password" onChange={
                        event => this.give_password(event.target.value)
                    }/>
                </div>
                <div id="div-to-submit-in-login">
                    <button className="button-to-enter-from-login" onClick={this.login}>submit</button>
                </div>
                <div id="div-to-enter-in-login-wellcome">
                    <h1>
                        wellcome {this.state.username}!
                    </h1>
                </div>
                <div id="div-to-enter-in-login">
                    <Link to={`/home/${this.state.token}`}>
                        <button className="button-to-enter-from-login">enter</button>
                    </Link>
                </div>
                <div id="signup-from-login">
                    <Link to="/signup">
                        <button className="button-to-enter-from-login-1">sign up</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;
