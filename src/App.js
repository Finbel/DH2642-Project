import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { modelInstance } from './data/DinnerModel'
import Homepage from "./Homepage/Homepage";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Dinner Planner',
        }

    }




    render() {


        return (
            <div className="App">
                <header className="App-header">

                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                    </Switch>
                </header>
            </div>
        );
    }
}

export default App;
