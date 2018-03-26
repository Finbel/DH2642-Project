import React, { Component } from 'react';


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
                    <button className="btn btn-info"> Take the quiz !</button>
                </div>
            </div>
        );
    }
}

export default CelebritiesQuiz;
