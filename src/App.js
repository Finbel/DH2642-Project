import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import Homepage from "./Homepage/Homepage";
import Quiz from "./Quiz/Quiz";
import SelectedArtists from "./SelectedArtists/SelectedArtists";
import RunningQuiz from "./RunningQuiz/RunningQuiz";
import { modelInstance } from './data/Model'
import quizApp from './reducer/reducers';


const store= createStore(quizApp);



class App extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/questions/:id" component={(props) => <RunningQuiz {...props} model={modelInstance} store={store}/>}/>
                    <Route path="/selection" component={(props) => <SelectedArtists {...props} model={modelInstance} store={store}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
