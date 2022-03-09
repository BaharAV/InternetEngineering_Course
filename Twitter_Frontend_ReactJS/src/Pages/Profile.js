import '../App.css';
import {Component} from "react";
import NavIn from "../Nav/NavIn";

class Profile extends Component {
    _isMounted = false;
    x = 0;

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
                            this.setState({username: json.username})
                            if (json.picture !== null) {
                                this.setState({picture: json.picture.substring(10)})
                                fetch(`http://localhost:9098/show/pic/${this.state.picture}`, {
                                    method: 'get',
                                }).then(response => response.blob())
                                    .then(blob => {
                                        var objectURL = URL.createObjectURL(blob);
                                        this.setState({src: objectURL})
                                    })
                            }
                        }
                    )
                } else {
                    console.log("error")
                }
            }
        )
    }

    setusername = () => {
        console.log(this.state.newusername)
        fetch('http://localhost:9098/users/set/username', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                auth: this.state.token
            },
            body: JSON.stringify({
                username: this.state.newusername
            })
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        this.setState({username: json.username})
                    })
                } else {
                    alert("choose an other username!");
                    console.log("error")
                }
            }
        )
    }

    setimage = async () => {
        var input = document.querySelector('input[type="file"]')
        var data = new FormData()
        data.append('picture', input.files[0])

        fetch('http://localhost:9098/users/set/picture', {
            method: 'POST',
            body: data,
            headers: {
                auth: this.state.token
            }
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        this.setState({picture: json.picture.substring(10)}, () => {
                            fetch(`http://localhost:9098/show/pic/${this.state.picture}`, {
                                method: 'get',
                            }).then(response => response.blob())
                                .then(blob => {
                                    var objectURL = URL.createObjectURL(blob);
                                    this.setState({src: objectURL})
                                })
                        })
                    })
                } else {
                    console.log("error")
                }
            }
        )
    }

    give_new_username = newusername => {
        this.setState({newusername: newusername});
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            picture: '',
            src: '',
            token: props.match.params.token,
            newusername: ''
        }
    }


    render() {
        const imgStyle = {
            width: '200px',
            height: '200px',
        };
        return (
            <div>
                <NavIn token={this.state.token}/>
                <h3>
                    hello {this.state.username}!
                </h3>
                <input type="file"/>
                <button onClick={this.setimage}>save</button>
                <div>
                    <img style={imgStyle} src={this.state.src} alt=""/>
                </div>
                <input placeholder="new username..." onChange={
                    event => this.give_new_username(event.target.value)
                }/>
                <button onClick={this.setusername}>save</button>
            </div>
        )
    }
}


export default Profile;
