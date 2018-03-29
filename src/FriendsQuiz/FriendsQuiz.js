import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FriendsQuiz extends Component {
    render() {
        return (
            <div className="FriendsQuiz col-md-7">
                Fill in the blank with the usernames of your friends :
                <p>Warning : Your friends msut have a public account !</p>
                <input type="text"></input> <br/>
                <input type="text"></input> <br/>
                <input type="text"></input> <br/>
                <input type="text"></input> <br/>
                <div className = "buttons">
                    <Link to="/questions/1">
                        <button className="btn btn-info" onClick = {() => this.props.changeStatus()}> Take the quiz !</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default FriendsQuiz;
