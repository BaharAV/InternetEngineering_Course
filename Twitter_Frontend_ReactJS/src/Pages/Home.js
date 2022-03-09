import '../App.css';
import {Component} from "react";
import Tweet from "../Component/Tweet";
import NavIn from "../Nav/NavIn";

class Home extends Component {
    _isMounted = false;
    x = 0;
    copyLinks = {}
    types = {}

    componentDidMount() {
        this._isMounted = true;
        this.begin();
        if (this._isMounted) {
            // this.findtweets();
            setTimeout(() => this.findtweets(), 1000)
        }
        setTimeout(() => this.setState({nothing: this.state.nothing + 1}), 2000)
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.begin();
        setTimeout(() => this.findtweets(), 1000)
        setTimeout(() => this.setState({nothing: this.state.nothing + 1}), 2000)
    }

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
                        // console.log(json)
                        this.setState({username: json.username}, () => {
                            // console.log(this.state.username)
                        })
                    })
                } else if (ok === 401) {
                    console.log("error")
                }
            }
        )
    }

    reloadtweets = () => {
        setTimeout(() => this.findtweets(), 1000)
    }

    findtweets = async () => {
        // console.log(this.state.username)
        await fetch(`http://localhost:9098/users/tweets/${this.state.username}`, {
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
                        // console.log(json)
                        this.setState({mytweets: json}, () =>
                            // console.log(this.state.mytweets)
                            console.log("tweets ready!")
                        )
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
            username: '',
            mytweets: [],
            token: props.match.params.token,
            links: [],
            nothing: 0
        }
    }

    findimage = async (pic, id) => {
        if (pic.includes(".mp4")) {
            this.types[id] = "video"
        } else {
            this.types[id] = "image"
        }
        await fetch(`http://localhost:9098/show/pic/${pic}`, {
            method: 'get',
        }).then(response => response.blob())
            .then(blob => {
                this.copyLinks[id] = URL.createObjectURL(blob)
            })
    }

    render() {
        var list = this.state.mytweets;
        let myTweetsInDiv = list.map((item) => {
            this.x += 1
            var colorlike = item.liked === true ? "red" : "black"
            var colorretweeted = item.retweeted === true ? "gray" : "black"
            var colordeleted = item.author.username === this.state.username ? "black" : "gray"
            var src = null
            var hidden1 = 'none'
            var hidden2 = 'none'
            var type = ''
            if (item.picture !== null) {
                this.findimage(item.picture.substring(10), item.id)
                // var temp = this.copyLinks.pop(item.id)
                var temp = this.copyLinks[item.id]
                if (temp !== undefined) {
                    src = temp
                    type = this.types[item.id]
                    if (type === "video") {
                        hidden1 = "none"
                        hidden2 = "inline"
                    } else if (type === "image") {
                        hidden1 = "inline"
                        hidden2 = "none"
                    }
                }
            } else {
                src = ''
                hidden1 = 'none'
                hidden2 = 'none'
            }
            return <Tweet key={this.x} text={item.body} username={item.author.username}
                          likes={item.likes} retweet={item.retweet} id={item.id} token={this.state.token}
                          liked={item.liked} retweeted={item.retweeted} hidden1={hidden1} hidden2={hidden2} src={src}
                          type={type}
                          colorlike={colorlike}
                          colorretweeted={colorretweeted} colordeleted={colordeleted} owner={this.state.username}
            />
        });
        return (
            <div>
                <NavIn token={this.state.token}/>
                <h3>
                    home
                </h3>
                <div id="my-tweets" onClick={this.reloadtweets}>{myTweetsInDiv}</div>
            </div>
        )
    }
}


export default Home;
