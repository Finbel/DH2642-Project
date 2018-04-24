import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            numOfQuest: this.props.model.getNumberOfAskedQuestion(),
            artists: this.props.model.getArtists(),
            askedQuestions: this.props.model.getAskedQuestions()
        }
        this.props.store.subscribe(()=>this.setState({}));
    }

    componentDidMount() {
        this.props.model.addObserver(this)
    }

    update(msg) {
        if (msg === 'artists'){
            this.setState({
                artists: this.props.model.getArtists()
            });
        }

    }

    displayQuest = function(quest){
        let success;
        switch(quest.success){
            case 1:
                success = "1pt";
                break;
            case 0:
                success = "0pt";
                break;
            default:
                success = "";
                break;
        }
        return <div key={quest.index}>Question {quest.index} {success}</div>
    }

    displayQuestions = function(){
        return this.state.askedQuestions.map((question) => this.displayQuest(question));
    }

    displayArtists = function(){
        return this.state.artists.map(artist => <div className="row">{artist.artist_name}</div> )
    }


    render() {
        let btn = null;
        switch(this.props.store.getState().status){
            case 'initial':
                btn = <Link to="/">
                    <button>Go back and select another quiz</button>
                </Link>
                break;
            default:
                break;
        }

        return (
            <div className="Sidebar col-md-4">
                    <div className="row title">
                        MusicQuiz
                    </div>

                    <div className="displayartists">
                        <div className="row display">Your artists :</div>
                        <div className = "name">{this.displayArtists()}</div>

                        <div className="row number">{this.state.numOfQuest}/10</div>
                        <div className="row questions">{this.displayQuestions()}</div>
                        {btn}
                    </div>
            </div>
        );
    }
}

export default Sidebar;
