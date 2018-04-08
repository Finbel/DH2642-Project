import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import './Finalpoints.css';

class Finalpoints extends Component {

 displayComment = function(points){ //not sure how to deal with the function of displaying different comments with differnt points
        let success;
        switch(quest.success){
            case 1:
                points = 4;
                break;
            case 2:
                points = 3;
                break;
            case 3:
                points = 2;
                break;
            case 4:
                points = 1;
                break;
            default:
                ponits = "";
                break;
        }
        return <div key={quest.index}>Question {quest.index} {success}</div>
    }

    render() {
        return (
            <div className="Finalpoints">
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

export default Finalpoints;