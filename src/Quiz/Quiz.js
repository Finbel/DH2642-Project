import React, { Component } from 'react';
import FriendsQuiz from "../FriendsQuiz/FriendsQuiz";
import CelebritiesQuiz from "../CelebritiesQuiz/CelebritiesQuiz";
import Sidebar from "../Sidebar/Sidebar";


class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            people: this.props.match.params.people,
        }
    }


    render() {
        let QuizType = null;
        switch(this.state.people){
            case "friends":
                QuizType = <FriendsQuiz/>;
                break;
            case "celebrities":
                QuizType = <CelebritiesQuiz/>;
                break;
            default:
                break;
        }
        return (
            <div className="Quiz">
                <Sidebar/>
                {QuizType}
            </div>
        );
    }
}

export default Quiz;
