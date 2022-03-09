import '../App.css';
import {Component} from "react";

class Likenotif extends Component {

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
                <div><span style={{color: "blue"}}>{this.state.doer}</span> liked <span>{this.state.tweetbody}</span>
                </div>
            </div>
        )
    }
}


export default Likenotif;
