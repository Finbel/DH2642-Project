import React, { Component } from 'react';
import './Finalpoints.css';
import { Link } from 'react-router-dom';

class Finalpoints extends Component {

    totalPoints(){
        let questions = this.props.model.getAskedQuestions();
        let total = 0;
        for (var i = 0; i < 10; i++){
            total += questions[i].success;
        }
        return total;
    }

 displayComment(){
        let points = this.totalPoints();
        let comment;
        let questions = this.props.model.getAskedQuestions().map(quest => <div key={quest.index}>Question {quest.index} : {quest.success} point</div>)
        switch(points){
            case 0:
            case 1:
            case 2:
                comment = "Oh... You don't seem to know those artists very well :'( Try again with other ones !";
                break;
            case 3:
            case 4:
            case 5:
                comment = "Well, it seems you know some of them. You'll do better next time !";
                break;
            case 6:
            case 7:
            case 8:
                comment = "Well done ! You know them a lot :)";
                break;
            case 9:
            case 10:
                comment = "Wouaw ! Congratulation, your score is impressive ! :D";
                break;
            default:
                break;
        }
        return <div>
            <div className="row"> {questions}</div>
            <div className="row"> Your score : {points} / 10</div>
            <div className="row">{comment}</div>
        </div>
   }

    render() {
        return (
            <div className="Finalpoints">
                <div className = "row">
                        <div className = "col-md-5 side">
                           
                        </div>

                        <div className = "col-md-7">
                            <div className="score">
                               <div className="firstly row">
                                 <div className="title1">YOU HAVE DONE THE QUIZ!</div>
                               </div>

                               <div className="secondly row">
                                    <div className="personal">
                                    {this.displayComment()}
                                    </div>
                               </div>
                            </div>

                                <div className="thirdly row">
                                    <div className="tryagain">
                                        <Link to = "/selection">
                                            <button className = "btn again">GO BACK AND TRY AGAIN</button>
                                        </Link>
                                    </div>
                               </div>

                    </div>            
                </div>
            </div>
        );
    }
}

export default Finalpoints;