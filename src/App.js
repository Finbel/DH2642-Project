import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import Homepage from "./Homepage/Homepage";
import SelectedArtists from "./SelectedArtists/SelectedArtists";
import Finalpoints from "./Finalpoints/Finalpoints";
import RunningQuiz from "./RunningQuiz/RunningQuiz";
import { modelInstance } from './data/Model'
import quizApp from './reducer/reducers';
import firebase from 'firebase';
var KEY = require("./configure.js")


const store= createStore(quizApp);

// Firebase configuration
var firebaseConfig = {
    apiKey: KEY.FIREBASE_API_KEY,
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
                    <Route path="/finalpoints" component={(props) => <Finalpoints {...props} model={modelInstance} store={store}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
