import '../App.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Trend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: props.body,
            count: props.count,
            token: props.token,
        }
    }

    render() {
        const navStyle = {
            color: 'black',
            textDecoration: 'none'
        };
        return (
            <div id="trending">
                <Link style={navStyle} to={`/trendstosee/${this.state.token}/${this.state.body.substring(1)}`}>
                    <div onClick={this.findrelatedtweets}>
                        <span className="span-for-trend">{this.state.body}</span>
                        <span className="span-for-trend">{this.state.count}</span>
                    </div>
                </Link>
            </div>
        )
    }
}


export default Trend;
