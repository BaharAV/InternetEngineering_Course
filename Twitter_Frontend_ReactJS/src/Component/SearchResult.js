import '../App.css';
import React, {Component} from "react";
// import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import {Link} from "react-router-dom";

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            in: props.in,
            picture: props.picture.substring(10),
            src: '',
            token: props.token,
            color: props.color
        }
    }

    profilefind = () => {
        fetch(`http://localhost:9098/show/pic/${this.state.picture}`, {
            method: 'get',
        }).then(response => response.blob())
            .then(blob => {
                var objectURL = URL.createObjectURL(blob);
                this.setState({src: objectURL})
            })
    }

    follow = () => {
        fetch("http://localhost:9098/users/follow", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': this.state.token
            },
            body: JSON.stringify({
                username: this.state.in.substring(0)
            })
        }).then(response => {
                var ok = response.status
                if (ok === 200) {
                    response.json().then(json => {
                        // console.log(json)
                    })
                } else {
                    alert("login first!")
                    console.log("error")
                }
            }
        )
    }

    render() {
        this.profilefind();
        const imgStyle = {
            width: '5vw',
            height: '5vw',
            borderRadius: 150 / 2,
            margin: '1vw'
        };
        const iconStyle = {
            color: this.state.color,
        };
        return (
            <div id="search-result-div">
                {/*<span className="search-result-div-span">*/}
                <Link to={`/userpage/${this.state.token}/${this.state.in}`}>
                    <span>
                        <img style={imgStyle} src={this.state.src} alt=""/>
                    </span>
                </Link>
                <span>
                    <div>
                         <div>
                            {this.state.in}
                        </div>
                        <div id="icon-follow" onClick={this.follow} style={iconStyle}>
                            <PersonAddOutlinedIcon fontSize="large"/>
                        </div>
                    </div>
                </span>
                {/*<span>*/}
                {/*        {this.state.in}*/}
                {/*</span>*/}
                {/*<span id="icon-follow" onClick={this.follow} style={iconStyle}>*/}
                {/*        <PersonAddOutlinedIcon fontSize="large"/>*/}
                {/*    </span>*/}
                {/*</span>*/}
            </div>
        )
    }
}


export default SearchResult;
