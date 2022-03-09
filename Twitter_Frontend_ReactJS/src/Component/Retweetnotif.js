import '../App.css';
import React, {Component} from "react";

class Retweetnotif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doer: props.doer,
            tweetid: props.tweetid,
            tweetbody: props.tweetbody,
            token: props.token,
        }
    }

    render() {
        return (
            <div id="search-result-div-notif">
                <div>
                    <span style={{color: "blue"}}>{this.state.doer}</span> retweeted <span>{this.state.tweetbody}</span>
                </div>
            </div>
        )
    }
}


export default Retweetnotif;
