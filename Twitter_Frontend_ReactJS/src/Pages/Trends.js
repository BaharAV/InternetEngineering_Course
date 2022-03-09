import '../App.css';
import {Component} from "react";
import Trend from "../Component/Trend";
import NavIn from "../Nav/NavIn";

class Trends extends Component {
    _isMounted = false;
    x = 0;

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.findtrends();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.findtrends();
    }


    reloadtrends = () => {
        setTimeout(() => this.findtrends(), 100)
    }

    findtrends = async () => {
        await fetch("http://localhost:9098/tweets/trends", {
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
                        this.setState({trends: json})
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
            trends: [],
            token: props.match.params.token
        }
    }

    render() {
        var list = this.state.trends;
        let myTrends = list.map((item) => {
            this.x += 1
            // console.log(item.body)
            // console.log(item.count)
            return <Trend key={this.x} body={item.body} count={item.count} token={this.state.token}/>
        });
        return (
            <div>
                <NavIn token={this.state.token}/>
                <h3>
                    your tweets
                </h3>
                <div id="my-tweets" onClick={this.reloadtrends}>{myTrends}</div>
            </div>
        )
    }
}


export default Trends;
