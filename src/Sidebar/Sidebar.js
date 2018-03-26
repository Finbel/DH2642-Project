import React, { Component } from 'react';
import Questions from "../Questions/Questions";


class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'initial',
        }
    }
    render() {
        let btn = null;
        switch(this.state.status){
            case 'initial':
                btn = <button>Go back and select another quiz</button>
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
