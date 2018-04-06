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
                            <h3> Test yourself about your favorites singers ! How much do you know their songs ?</h3>
                        </div>
                        <p>Choose up to 5 different artists and take the quiz about them and their songs. Are you ready ?</p>
                        <h2 id="HomeTitle"> Take the quiz !</h2>
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
