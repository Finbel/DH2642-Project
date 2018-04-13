import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
            console.log(this.state.artists)
        }
        //this.setState({
        //numOfQuest : this.props.model.getNumberOfAskedQuestion(),
        //})

    }

    displayQuest = function(quest){
        let success;
        switch(quest.success){
            case 1:
                success = "1pt";
                break;
            case 2:
                success = "0pt";
                break;
            default:
                success = "";
                break;
        }
        return <div key={quest.index}>Question {quest.index} {success}</div>
    }

    displayQuestions = function(){
        return this.state.askedQuestions.map((question) => this.displayQuest(question))
    }

    displayArtists = function(){
        return this.state.artists.map(artist => <div className="row">{artist.artist_name}</div> )
    }


    render() {
        let btn = null;
        console.log(this.props.store.getState().status);
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
            <div className="Sidebar col-md-5">
                <div className="row">
                    <h2>Quiz</h2>
                </div>
                <div className="row">Your artists :</div>
                {this.displayArtists()}
                <div className="row">{this.state.numOfQuest}/10</div>
                {this.displayQuestions()}
                {btn}
            </div>
        );
    }
}

export default Sidebar;
