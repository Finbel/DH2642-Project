import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import Homepage from "./Homepage/Homepage";
import SelectedArtists from "./SelectedArtists/SelectedArtists";
import RunningQuiz from "./RunningQuiz/RunningQuiz";
import { modelInstance } from './data/Model'
import quizApp from './reducer/reducers';
import * as firebase from 'firebase';

const store= createStore(quizApp);

var firebaseConfig = {
    apiKey: "AIzaSyB91MtsueeW8ij89tz38Uu9HSdKVypIRp8",
    authDomain: "dh2642-aa0f4.firebaseapp.com",
    databaseURL: "https://dh2642-aa0f4.firebaseio.com",
    storageBucket: "dh2642-aa0f4.appspot.com",
};
firebase.initializeApp(firebaseConfig);

class App extends Component {

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
