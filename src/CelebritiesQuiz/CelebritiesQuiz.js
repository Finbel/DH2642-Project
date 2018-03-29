import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CelebritiesQuiz extends Component {
    refresh = function() {
        return;
    }
    render() {
        return (
            <div className="CelebritiesQuiz col-md-7">
                <p>We have randomly chosen celebrities for you ! Be free to change the celebrities by clicking on the refresh button.</p>
                <div className="row">
                    <div className="col-md-3">Beyonce</div>
                    <div className="col-md-3" onClick = {() => this.refresh()}> Refresh </div>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-3">Rihanna</div>
                    <div className="col-md-3" onClick = {() => this.refresh()}> Refresh </div>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-3">Justin Bieber</div>
                    <div className="col-md-3" onClick = {() => this.refresh()}> Refresh </div>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-3">Bruno Mars</div>
                    <div className="col-md-3" onClick = {() => this.refresh()}> Refresh </div>
                    <br/>
                </div>
                <div className = "buttons">
                    <Link to="/questions/1">
                        <button className="btn btn-info" onClick = {() => this.props.changeStatus()}> Take the quiz !</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default CelebritiesQuiz;
