import React, { Component } from 'react';
import FriendsQuiz from "../FriendsQuiz/FriendsQuiz";
import CelebritiesQuiz from "../CelebritiesQuiz/CelebritiesQuiz";
import Sidebar from "../Sidebar/Sidebar";


class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'initial',
            people: this.props.match.params.people,
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.getStatus = this.getStatus.bind(this);

    }

    changeStatus(){
        // this.setState({
        //     status: 'LOADED',
        // })
        this.props.store.dispatch({
            type:'QUIZ_STARTED',
            newStatus: 'LOADED'
        });
    }

    getStatus(){
        return this.state.status;
    }


    render() {
        let QuizType = null;
        switch(this.state.people){
            case "friends":
                QuizType = <FriendsQuiz changeStatus={this.changeStatus} store={this.props.store}/>;
                break;
            case "celebrities":
                QuizType = <CelebritiesQuiz changeStatus={this.changeStatus} store={this.props.store}/>;
                break;
            default:
                break;
        }
        return (
            <div className="Quiz">
                <Sidebar model={this.props.model} store={this.props.store}/>
                {QuizType}
            </div>
        );
    }
}

export default Quiz;
