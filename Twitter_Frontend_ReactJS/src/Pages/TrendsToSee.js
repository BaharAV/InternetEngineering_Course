import '../App.css';
import React, {Component} from "react";
import NavIn from "../Nav/NavIn";
import SearchResult from "../Component/SearchResult";
import Tweet from "../Component/Tweet";
import NavBack from "../Nav/NavBack";

class TrendsToSee extends Component {
    x = 0;
    copyLinks = {}
    types = {}

    componentDidMount() {
        this._isMounted = true;
        this.begin();
        if (this._isMounted) {
            setTimeout(() => this.searching(), 1000)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.begin();
        setTimeout(() => this.searching(), 1000)
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

    constructor(props) {
        super(props);
        this.state = {
            token: props.match.params.token,
            search: props.match.params.trend,
            searchresult: [],
            nothing: 0,
            username: ''
        }
    }

    searching = () => {
        var keys = '$' + this.state.search
        // console.log(keys)
        fetch(`http://localhost:9098/search?input=${keys}`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            var ok = response.status
            if (ok === 200) {
                response.json().then(json => {
                    this.setState({searchresult: json}, () => {
                        // console.log(this.state.searchresult)
                    })
                })
                // this.setState({searchresult: response.json})
            } else {
                console.log("error!")
            }
        })
        setTimeout(() => this.setState({nothing: this.state.nothing + 1}), 1000)
    }

    reloadtweets = () => {
        setTimeout(() => this.searching(), 1000)
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
        if (this.state.searchresult.length > 0) {
            var serachResultsTweet = []
            let list = this.state.searchresult;
            serachResultsTweet = list.map((item) => {
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
                              liked={item.liked} retweeted={item.retweeted} hidden1={hidden1} hidden2={hidden2}
                              src={src}
                              type={type}
                              colorlike={colorlike}
                              colorretweeted={colorretweeted} colordeleted={colordeleted}
                              owner={this.state.username}
                />
            });
        }
        return (
            <div>
                <NavBack token={this.state.token}/>
                <div id="search-result-tweet" onClick={this.reloadtweets}>
                    {serachResultsTweet}
                </div>
            </div>
        );
    }
}

export default TrendsToSee;
