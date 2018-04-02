import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    render() {
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    Your question here <br/>
                    - Prop 1 <br/>
                    - Prop 2 <br/>
                    - Prop 3 <br/>
                    - Prop 4 <br/>
                </div>
            </div>
        );
    }
}

export default RunningQuiz;
