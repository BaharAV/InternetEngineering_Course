import '../App.css';
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import NavIn from "../Nav/NavIn";

class MakeTweets extends Component {

    give_tweet = text => {
        this.setState({text: text})
    }

    posttweet = () => {
        var input = document.querySelector('input[type="file"]')
        var data = new FormData()
        data.append('picture', input.files[0])
        data.append('body', JSON.stringify(this.state.text))
        if (input.files[0] === undefined && this.state.text.length === 0) {
            alert("empty tweet is not valid!")
        } else {
            fetch('http://localhost:9098/tweets/add', {
                method: "post",
                headers: {
                    'auth': this.state.token
                },
                body: data
            }).then(response => {
                    var ok = response.status
                    if (ok === 200) {
                        response.json().then(json => {
                            console.log(json)
                        })
                    } else {
                        alert("empty tweet!");
                        console.log("error")
                    }
                }
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            nothing: 0,
            src: '',
            picture: '',
            username: '',
            token: props.match.params.token,
            text: '',
        }
    }

    render() {
        return (
            <div>
                <NavIn token={this.state.token}/>
                <div id="text-area-to-tweet-div">
                    <textarea maxLength="250" placeholder=" what's up?..." id="text-area-to-tweet" onChange={
                        event => this.give_tweet(event.target.value)
                    }/>
                </div>
                <input type="file"/>
                <Link to={`/home/${this.state.token}`}>
                    <div>
                        <button id="buttons-to-tweet"
                                onClick={this.posttweet}>post
                        </button>
                    </div>
                </Link>
            </div>
        )
    }
}


export default MakeTweets;
