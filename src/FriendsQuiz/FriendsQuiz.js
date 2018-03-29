import React, { Component } from 'react';


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
                    <button className="btn btn-info" onClick = {() => this.props.changeStatus()}> Take the quiz !</button>
                </div>
            </div>
        );
    }
}

export default FriendsQuiz;
