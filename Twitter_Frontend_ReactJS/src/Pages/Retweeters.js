import '../App.css';
import {Component} from "react";
import SearchResult from "../Component/SearchResult";
import NavBack from "../Nav/NavBack";

class Retweeters extends Component {
    _isMounted = false;
    x = 0;

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            setTimeout(() => this.findretweeters(), 100)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        setTimeout(() => this.findretweeters(), 100)
    }


    findretweeters = async () => {
        fetch(`http://localhost:9098/tweets/getRetweets/${this.state.id}`, {
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
                        this.setState({usernames: json})
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
            usernames: [],
            token: props.match.params.token,
            id: props.match.params.id
        }
    }

    render() {
        var list = this.state.usernames;
        let usernamesList = list.map((item) => {
            this.x += 1
            return <SearchResult key={this.x} token={this.state.token} in={item.username} picture={item.picture}/>
        });
        return (
            <div>
                <NavBack token={this.state.token}/>
                <h3>
                    retweeters
                </h3>
                <div id="my-tweets">{usernamesList}</div>
            </div>
        )
    }
}


export default Retweeters;
