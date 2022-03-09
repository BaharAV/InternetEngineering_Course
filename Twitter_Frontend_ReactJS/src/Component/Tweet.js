import '../App.css';
import React, {Component} from "react";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import ThreeSixtyOutlinedIcon from '@material-ui/icons/ThreeSixtyOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import {Link} from "react-router-dom";

class Tweet extends Component {
    _isMounted = false;

    begin = () => {
        fetch('http://localhost:9098/users/me', {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': this.state.token
            }
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        this.setState({owner: json.username}, () => {
                            // console.log(this.state.username)
                        })
                    })
                } else {
                    console.log("error")
                }
            }
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            owner: props.owner,
            username: props.username,
            text: props.text.substring(1, props.text.length - 1),
            likes: props.likes,
            retweet: props.retweet,
            id: props.id,
            token: props.token,
            liked: props.liked,
            retweeted: props.retweeted,
            colorretweeted: props.colorretweeted,
            colorlike: props.colorlike,
            colordeleted: props.colordeleted,
            likers: [],
            retweeters: [],
            src: props.src,
            hidden1: props.hidden1,
            hidden2: props.hidden2,
            type: props.type
        }
    }

    deleted = () => {
        this.begin();
        if (this.state.owner === this.state.username) {
            fetch(`http://localhost:9098/tweets/${this.state.id}`, {
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth': this.state.token
                }
            }).then(response => {
                    var ok = response.status
                    if (ok === 200) {
                        response.json().then(json => {
                            console.log("deleted!")
                        })
                    } else {
                        alert("login first!");
                        console.log("error")
                    }
                }
            )
        } else {
            alert("you do not have access to delete this tweet!");
        }
    }

    like = () => {
        fetch(`http://localhost:9098/tweets/like/${this.state.id}`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': this.state.token
            }
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        console.log("liked!")
                    })
                } else {
                    alert("login first!");
                    console.log("error")
                }
            }
        )
    }

    retweet = () => {
        fetch(`http://localhost:9098/tweets/retweet/${this.state.id}`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': this.state.token
            }
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        console.log("retweeted!")
                    })
                } else {
                    alert("login first!");
                    console.log("error")
                }
            }
        )
    }

    render() {
        const imgStyle = {
            width: '50%',
            height: 'auto',
            borderRadius: '5px'
        };
        const navStyle = {
            color: 'black',
            textDecoration: 'none'
        };
        return (
            <div className="single-tweet">
                <div className="tweet-texts">
                    <code className="username-in-tweets">{this.state.username} </code>
                    {this.state.text}
                </div>
                <p/>
                <div style={{display: this.state.hidden1}}>
                    <img style={imgStyle} src={this.state.src} alt=""/>
                </div>
                <div style={{display: this.state.hidden2}}>
                    <video style={imgStyle} controls>
                        <source src={this.state.src} type="video/mp4">
                        </source>
                    </video>
                </div>
                <div>
                <span id="icon-delete" onClick={this.deleted.bind(this)} style={{color: this.state.colordeleted}}>
                    <DeleteOutlineOutlinedIcon/>
                </span>
                    <Link style={navStyle} to={`/likers/${this.state.token}/${this.state.id}`}>
                        <span className="icon-texts">
                            {this.state.likes}
                        </span>
                    </Link>
                    <span id="icon-heart" onClick={this.like.bind(this)} style={{color: this.state.colorlike}}>
                        <FavoriteBorderOutlinedIcon/>
                    </span>
                    <Link style={navStyle} to={`/retweeters/${this.state.token}/${this.state.id}`}>
                        <span className="icon-texts">
                            {this.state.retweet}
                        </span>
                    </Link>
                    <span id="icon-retweet" onClick={this.retweet.bind(this)}
                          style={{color: this.state.colorretweeted}}>
                    <RepeatOutlinedIcon/>
                </span>
                </div>
            </div>
        )
    }
}


export default Tweet;
