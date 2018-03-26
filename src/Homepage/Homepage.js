import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';


class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div className = "row">
                    <div className = "col-md-5">
                        <p> Picture </p>
                    </div>
                    <div className = "col-md-7">
                        <div className = "row">
                            <h3> How much do you know about your friends or celebrities ?</h3>
                        </div>
                        <h2 id="HomeTitle"> Take the quiz !</h2>
                        <div className = "buttons">
                            <Link to = "/friends">
                                <button className = "btn btn-info">Quiz about your friends</button>
                            </Link>
                            <br/><br/>
                            <Link to = "/celebrities">
                                <button className = "btn btn-info">Quiz about celebrities</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;
