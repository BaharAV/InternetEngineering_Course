import '../App.css';
import {Component} from "react";

class Follownotif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doer: props.doer,
            following: props.following,
            token: props.token,
        }
    }

    render() {
        return (
            <div id="search-result-div-notif">
                <div><span style={{color: "blue"}}>{this.state.doer}</span> followed <span
                    style={{color: "blue"}}>{this.state.following}</span>
                </div>
            </div>
        )
    }
}


export default Follownotif;
