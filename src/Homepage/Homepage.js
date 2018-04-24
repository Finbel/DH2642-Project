import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';


class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">

                <div className = "row">
                    <div className = "col-md-2">
                    </div>

                    <div className = "col-md-4">
                        <div className = "row HomeTitle">
                        MusicQuiz
                        </div>

                        <div className = "row sub-title">
                            How much do you know about your favourite artists’ work？                          
                        </div>
                        
                        <div className = "row titledescription">
                            Choose 4 different artists and take the quiz about their songs. Are you ready ?
                        </div>
                       
                        
                        <div className = "buttons">
                            <Link to = "/selection">
                                <button className = "btn button">Let's select your artists</button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className = "col-md-6">
                    </div>

                </div>
            </div>
        );
    }
}

export default Homepage;
