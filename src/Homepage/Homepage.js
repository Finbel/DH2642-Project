import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';


class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <div className = "row">
                    <div className = "col-md-4">
                        <p> Picture </p>
                    </div>
                    <div className = "col-md-8">
                        <div className = "row title">
                            <h3> Test yourself about your favorites singers ! How much do you know their songs ?</h3>
                            <p>Choose up to 5 different artists and take the quiz about them and their songs. Are you ready ?</p>
                        </div>
                       
                        <h2 id="HomeTitle"> Take the quiz !</h2><br/>
                        <div className = "buttons">
                            <Link to = "/selection">
                                <button className = "btn btn-info">Let's select your artists</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;
