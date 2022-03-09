import '../App.css';
import {Link} from "react-router-dom";
import React, {Component} from "react";
import Nav from '../Nav/Nav';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            id: ''
        }
    }

    give_username = username => {
        this.setState({username: username});
    }
    give_email = email => {
        this.setState({email: email});
    }
    give_password = password => {
        this.setState({password: password});
    }

    signup = () => {
        fetch('http://localhost:9098/users/signup', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        }).then(response => {
            var ok = response.status
            if (ok === 200) {
                response.json().then(json => {
                    var jsonstr = json.toString()
                    this.setState({id: jsonstr}, () => {
                        document.getElementById("div-to-go").style.display = "inline";
                        document.getElementById("div-sumbit").style.display = "none";
                    })
                })
            } else {
                alert("choose an other username!");
            }
        })
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="div-for-name">
                    <input placeholder="username" id="username"
                           onChange={
                               event => this.give_username(event.target.value)
                           }/>
                </div>
                <div>
                    <input placeholder="password" type="password" id="password"
                           onChange={
                               event => this.give_password(event.target.value)
                           }/>
                </div>
                <div>
                    <input placeholder="email" id="email"
                           onChange={
                               event => this.give_email(event.target.value)
                           }/>
                </div>
                <div id="div-sumbit">
                    <button id="submit" onClick={this.signup}>submit</button>
                </div>
                <div>
                    <Link to="/login" id="div-to-go">
                        <button className="button-to-enter-from-login-1">login</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
