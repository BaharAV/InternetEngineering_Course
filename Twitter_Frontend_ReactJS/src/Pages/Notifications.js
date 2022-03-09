import '../App.css';
import React, {Component} from "react";
import Follownotif from "../Component/Follownotif";
import Retweetnotif from "../Component/Retweetnotif";
import Likenotif from "../Component/Likenotif";
import NavIn from "../Nav/NavIn";

class Notifications extends Component {
    _isMounted = false;
    x = 0;

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            setTimeout(() => this.findnotifs(), 100)
        }
        setInterval(this.reloadtnotifs, 200);
    }

    componentWillUnmount() {
        this._isMounted = false;
        setTimeout(() => this.findnotifs(), 100)
    }

    reloadtnotifs = () => {
        setTimeout(() => this.findnotifs(), 1000)
    }

    findnotifs = async () => {
        await fetch("http://localhost:9098/notifications", {
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
                        this.setState({notifications: json}, () =>
                            console.log("notifications ready!")
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
            notifications: [],
            token: props.match.params.token
        }
    }

    render() {
        var list = this.state.notifications;
        let Notifs = list.map((item) => {
            this.x += 1
            if (item.type === "follow") {
                return <Follownotif key={this.x} token={this.state.token} doer={item.doer.username}
                                    following={item.following.username}/>
            } else if (item.type === "like") {
                return <Likenotif key={this.x} token={this.state.token} doer={item.doer.username}
                                  tweetbody={item.tweetBody}
                                  tweetid={item.tweetId}/>
            } else {
                return <Retweetnotif key={this.x} token={this.state.token} doer={item.doer.username}
                                     tweetbody={item.tweetBody}
                                     tweetid={item.tweetId}/>
            }
        });
        return (
            <div>
                <NavIn token={this.state.token}/>
                <h3>
                    your notifications
                </h3>
                <div id="my-notifs" onClick={this.reloadtnotifs}>{Notifs}</div>
            </div>
        )
    }
}

export default Notifications;
