import React, { Component } from 'react';
import Questions from "../Questions/Questions";
import { Link } from 'react-router-dom';


class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            numOfQuest: this.props.model.getNumberOfAskedQuestion()
        }
        this.props.store.subscribe(()=>this.setState({}));
    }

    componentDidMount() {
        this.props.model.addObserver(this)
    }

    update() {
        this.setState({
            numOfQuest : this.props.model.getNumberOfAskedQuestion()
        })
    }




    render() {
        let btn = null;
        console.log(this.props.store.getState().status);
        switch(this.props.store.getState().status){
            case 'initial':
                btn = <Link to="/">
                    <button>Go back and select another quiz</button>
                </Link>
                break;
            default:
                break;
        }

        return (
            <div className="Sidebar col-md-5">
                <h2>InstaQuiz</h2>
                <Questions/>
                {btn}
            </div>
        );
    }
}

export default Sidebar;
