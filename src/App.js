import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from "./Homepage/Homepage";
import Quiz from "./Quiz/Quiz";
import RunningQuiz from "./RunningQuiz/RunningQuiz";
import { modelInstance } from './data/Model'

class App extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/questions/:id" component={(props) => <RunningQuiz {...props} model={modelInstance}/>}/>
                    <Route path="/:people" component={(props) => <Quiz {...props} model={modelInstance}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
