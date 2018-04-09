import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import './Finalpoints.css';

class Finalpoints extends Component {

 // displayComment = function(points){ //not sure how to deal with the function of displaying different comments with differnt points
 //        let success;
        
 //            case 1:
 //                points = 4;
 //                break;
 //            case 2:
 //                points = 3;
 //                break;
 //            case 3:
 //                points = 2;
 //                break;
 //            case 4:
 //                points = 1;
 //                break;
 //            default:
 //                ponits = "";
 //                break;
 //        }
 //        return <div key={quest.index}>Question {quest.index} {success}</div>
   // }

    render() {
        return (
            <div className="Finalpoints">
                <div className = "row title1">
                    <div className = "col-md-12">
                        <h3>You have done the quiz!</h3>
                    </div>
                    
                </div>
                <div className = "row">
                    <div className = "col-md-12">
                        <p>It seems you know all these artists well :)</p>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Finalpoints;