import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from "./Homepage/Homepage";
import Quiz from "./Quiz/Quiz";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }




    render() {


        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/:people" component={Quiz}/>
                </Switch>
            </div>
        );
    }
}

export default App;
