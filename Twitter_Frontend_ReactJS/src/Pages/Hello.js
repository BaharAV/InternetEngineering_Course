import '../App.css';
import React, {Component} from "react";
import Nav from '../Nav/Nav';

class Hello extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div id="wellcome-page">
                    <h1>
                        wellcome to Twitter
                    </h1>
                    <h3>
                        by yalda and bahar!
                    </h3>
                </div>
            </div>
        );
    }
}

export default Hello;
