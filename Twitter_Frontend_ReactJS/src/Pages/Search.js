import '../App.css';
import React, {Component} from "react";
import NavIn from "../Nav/NavIn";
import SearchResult from "../Component/SearchResult";
import Tweet from "../Component/Tweet";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

class Search extends Component {
    x = 0;
    copyLinks = {}
    types = {}

    componentDidMount() {
        this._isMounted = true;
        this.begin();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.begin();
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
            search: '',
            username: '',
            token: props.match.params.token,
            searchresult: []
        }
    }

    give_search = search => {
        this.setState({searchresult: []})
        this.setState({search: search});
    }

    searching = () => {
        var keys = this.state.search
        if (keys.startsWith("#", 0)) {
            keys = '$' + keys.substring(1)
            // console.log(keys)
        }
        fetch(`http://localhost:9098/search?input=${keys}`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            var ok = response.status
            if (ok === 200) {
                // console.log(response.json())
                response.json().then(json => {
                    // console.log(json)
                    this.setState({searchresult: json}, () => {
                    })
                })
                this.setState({searchresult: response.json})
            } else if (ok === 400) {
                console.log("error!")
            }
        })
        setTimeout(() => this.setState({nothing: this.state.nothing + 1}), 1000)
    }

    reloadtweets = () => {
        setTimeout(() => this.searching(), 1000)
    }

    reloadusers = () => {
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
                ;
                this.copyLinks[id] = URL.createObjectURL(blob)
            })
    }

    render() {
        if (this.state.search.startsWith("@", 0) && this.state.search.length > 1) {
            if (this.state.searchresult.length > 0) {
                document.getElementById("search-result-username").style.display = "inline"
                document.getElementById("search-result-tweet").style.display = "none"
                var serachResults = []
                let list = this.state.searchresult;
                serachResults = list.map((item) => {
                    this.x += 1
                    if (item.followed === true) {
                        return <SearchResult key={this.x} token={this.state.token} in={item.username}
                                             picture={item.picture} color="blue"/>
                    } else {
                        return <SearchResult key={this.x} token={this.state.token} in={item.username}
                                             picture={item.picture} color="black"/>
                    }

                });
            }
        } else {
            if (this.state.searchresult.length > 0 && this.state.search.length > 1) {
                document.getElementById("search-result-username").style.display = "none"
                document.getElementById("search-result-tweet").style.display = "inline"
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
                        // console.log(src)
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
        }
        return (
            <div>
                <NavIn token={this.state.token}/>
                <div id="search-area">
                    <input placeholder="search" id="search-item"
                           onChange={
                               event => this.give_search(event.target.value)
                           }/>
                    <span id="submit" onClick={this.searching}><SearchOutlinedIcon
                        fontSize="large"/></span>
                </div>
                <div id="search-result-username" style={{display: "none"}} onClick={this.reloadusers}>
                    {serachResults}
                </div>
                <div id="search-result-tweet" style={{display: "none"}} onClick={this.reloadtweets}>
                    {serachResultsTweet}
                </div>
            </div>
        );
    }
}

export default Search;
