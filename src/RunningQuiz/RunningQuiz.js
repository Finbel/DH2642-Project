import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
        }
    }

    nextQuestion = function(){
        let question = modelInstance.getRandomQuestion();
        modelInstance.addAskedQuestion(question);
        let artists = modelInstance.getArtists();
        switch(question.id){
            case 0:
                let goodArtist = artists[modelInstance.getRandomInt(artists.length)];
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
        return question.question;
    }

    render() {
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    {this.nextQuestion()} <br/>
                    - Prop 1 <br/>
                    - Prop 2 <br/>
                    - Prop 3 <br/>
                    - Prop 4 <br/>
                </div>
            </div>
        );
    }
}

export default RunningQuiz;
