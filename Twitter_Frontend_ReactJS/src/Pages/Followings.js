import '../App.css';
import React, {Component} from "react";
import SearchResult from "../Component/SearchResult";
import NavIn from "../Nav/NavIn";

class Followings extends Component {
    _isMounted = false;
    x = 0;

    componentDidMount() {
        this._isMounted = true;
        this.begin();
        if (this._isMounted) {
            setTimeout(() => this.findusers(), 100)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.begin();
        setTimeout(() => this.findusers(), 100)
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
                        })
                    })
                } else if (ok === 401) {
                    console.log("error")
                }
            }
        )
    }

    reloadusers = () => {
        setTimeout(() => this.findusers(), 1000)
    }

    findusers = async () => {
        await fetch(`http://localhost:9098/users/followings/${this.state.username}`, {
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
                        this.setState({users: json}, () =>
                            console.log("users ready!")
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
            users: [],
            token: props.match.params.token
        }
    }

    render() {
        var list = this.state.users;
        let TheFollowers = list.map((item) => {
            this.x += 1
            if (item.followed === true) {
                return <SearchResult key={this.x} token={this.state.token} picture={item.picture} in={item.username}
                                     color="blue"/>
            } else {
                return <SearchResult key={this.x} token={this.state.token} picture={item.picture} in={item.username}
                                     color="black"/>
            }
        });
        return (
            <div>
                <NavIn token={this.state.token}/>
                <h3>
                    your followings
                </h3>
                <div id="my-tweets" onClick={this.reloadusers}>{TheFollowers}</div>
            </div>
        )
    }
}

export default Followings;
