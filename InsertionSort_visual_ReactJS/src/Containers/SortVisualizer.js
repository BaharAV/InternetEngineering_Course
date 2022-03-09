import React, {Component} from "react";
import Bar from "../Components/Bar";
import Input from "../Components/Input";
import Button from "../Components/Button";
import ReactDOM from 'react-dom';

class Text extends Component {
    render() {
        return (
            <span>{this.props.text}</span>
        )
    }
}

class SortVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            value_array: [],
            bars: [],
            time: 50,
            blue: -1,
            green: -1,
            steps: [],
            action: [],
            time_input: '',
            number_input: '',
            timerid: -1
        }
    }

    insertionSort = (copy) => {
        let steps = [];
        let actions = [];
        for (let i = 0; i < copy.length; i++) {
            copy[i] = parseInt(copy[i]);
        }
        for (let i = 1; i <= copy.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (copy[j + 1] < copy[j]) {
                    const temp = copy[j];
                    copy[j] = copy[j + 1];
                    copy[j + 1] = temp;
                    actions.push([j, i]);
                    steps.push([...copy]);
                } else {
                    actions.push([j, i]);
                    steps.push([...copy]);
                    break;
                }
            }
        }
        this.setState({steps: steps, action: actions});
    };

    play = () => {
        var i = 0;
        var timerid = setInterval(() => {
            if (i < this.state.steps.length) {
                if (i !== this.state.steps.length - 1) {
                    this.setState({blue: this.state.action[i][1], green: this.state.action[i][0]});
                } else {
                    this.setState({blue: -1, green: -1}, () => {
                        ReactDOM.render(<Text text={"Sorted!"}/>, document.getElementById('end-message'));
                    });
                }
                this.setState({
                    bars: this.state.steps[i]
                });
                i++;
            }
        }, this.state.time);
        this.setState({timerid: timerid});
    }

    clearall = () => {
        clearInterval(this.state.timerid);
        this.setState({
            value: '',
            value_array: [],
            bars: [],
            time: 50,
            blue: -1,
            green: -1,
            steps: [],
            action: [],
            time_input: '',
            number_input: '',
            timerid: -1
        }, () => {
            ReactDOM.render(<Text text={""}/>, document.getElementById('end-message'));
        });
    }

    makearray = () => {
        clearInterval(this.state.timerid);
        ReactDOM.render(<Text text={""}/>, document.getElementById('end-message'));
        this.setState({value_array: this.state.value.split(' ').filter((x => x !== ''))}, () => {
            this.insertionSort(this.state.value_array);
            this.play();
        });
    };

    give_time = time => {
        this.setState({time_input: time});
        this.setState({time: time});
    }

    give_number = value => {
        this.setState({number_input: value}, () => {
            ReactDOM.render(<Text text={""}/>, document.getElementById('end-message'));
            this.setState({value: value}, () => {
                var list_to_show = this.state.value.split(' ')
                list_to_show = list_to_show.filter((x => x !== ''));
                this.setState({
                    bars: list_to_show
                });
            });
        });
    }

    render() {
        var list = this.state.bars;
        var time_input = this.state.time_input;
        var number_input = this.state.number_input;
        let barsInDiv = list.map((item, index) => {
            if (index === this.state.blue) {
                return <Bar key={index} height={item} backgroundColor={"blue"}/>
            } else if (index === this.state.green) {
                return <Bar key={index} height={item} backgroundColor={"green"}/>
            } else {
                return <Bar key={index} height={item} backgroundColor={"limegreen"}/>
            }
        });
        return (
            <div className={"visualizer-container"}>
                <div id={"array_container_id"} className={"array-container"}>
                    {barsInDiv}
                </div>
                <div id={"end-message"}>

                </div>
                <div className={"input-container"}>
                    <div>
                        <Input
                            onChange={
                                event => this.give_time(event.target.value)
                            }
                            value={time_input}
                            elementId={"interval"}
                            type="text"
                            width={"300px"}
                            placeholder={"Interval(ms) - default is 50ms"}
                        />
                    </div>
                    <div>
                        <Input
                            onChange={
                                event => this.give_number(event.target.value)
                            }
                            value={number_input}
                            elementId={"array"}
                            type="text"
                            width={"600px"}
                            placeholder={"Numbers"}
                        />
                    </div>
                </div>
                <footer className="app-footer">
                    <Button
                        onClick={
                            this.makearray
                        }
                        elementId={"start"} text={"Insertion Sort"}
                    />
                    <Button
                        onClick={
                            this.clearall
                        }
                        elementId={"clean"} text={"Clear"}/>
                </footer>
            </div>
        );
    }
}

export default SortVisualizer;
