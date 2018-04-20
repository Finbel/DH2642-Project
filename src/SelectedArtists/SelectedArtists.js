import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
//import './SelectedArtists.css';


class SelectedArtists extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'initial',
            artists: this.props.model.getArtists(),
            searchStatus:'initial',
            suggestion: this.props.model.getRandomArtists()
        }
    }

    takeQuiz(){
        if (this.state.artists.length !== 4){
            alert("Please select 4 artists");
            return;
        }
        this.setState({
            status: 'LOADED'
        });
        this.props.store.dispatch({
            type:'QUIZ_STARTED',
            newStatus: 'LOADED'
        });
    }

    componentDidMount() {
        this.props.model.addObserver(this)
    }

    update() {
        this.setState({
            artists : this.props.model.getArtists()
        })
    }


    setInput(name){
        this.setState({
            input: name
        });
    }

    displayRandomArtists = function(){
        return this.state.suggestion.map((artist) =>
            <div className="col-md-2"><button onClick={() => {
                this.props.model.searchArtist(artist).then(data =>
                    this.props.model.addArtists(data[0])).catch( () =>
                console.log('error'));
                console.log("click")
            }}>{artist}</button></div>
        );
    };

    search = function(){
        this.setState({
            searchStatus:'loading'
        });
        this.props.model.searchArtist(this.state.input).then( artists => {
            this.setState({
                searchStatus: 'LOADED',
                search : artists
            })
            }).catch(() => {
            this.setState({
                status: 'ERROR'
            })
        });
    };

    displayArtists = function(){
        if(this.state.search) {
            return this.state.search.map(artist =>
                <div className="col-md-2"><button onClick={() => this.props.model.addArtists(artist)}>
                    {artist.artist_name}
                </button></div>)
        }
    };


    render() {
        let waitForArtists = null;
        switch (this.state.searchStatus) {
            case 'initial':
                waitForArtists = null;
                break;
            case 'loading':
                waitForArtists = <em>Loading...</em>
                break;
            case 'LOADED':
                waitForArtists = null;
                break;
            default:
                waitForArtists = <b>Failed to load data, please try again</b>
                break;
        }

        let quizBtn = null;
        if(this.state.artists.length === 4){
            quizBtn = <div className = "buttons">
                <Link to="/questions/1">
                    <button className="forbuttons" onClick = {() => this.takeQuiz()}> Take the quiz !</button>
                </Link>
            </div>
        }

        return (
            <div className="SelectedArtists">
                <Sidebar model={this.props.model} store={this.props.store}/>
                <div className="col-md-7">
                    <div className="row">Choose 4 artists then take the quiz !</div>
                    <div className="row">Suggestion :</div>
                    <div className="row">{this.displayRandomArtists()}</div>
                    <div className="row">
                        Didn't find artists you want? You can type in your favourite artists here : <br/><br/>
                        <div className="typein">
                            <div className="col-md-3">
                                <input type="text" id="search1" onChange = {(event) => this.setInput(event.target.value)}></input>
                            </div>
                            <div className="col-md-2">
                                <button className="forbuttons" onClick={() => this.search()}>search</button>
                            </div>
                        </div>
                    </div>
                    {waitForArtists}
                    {this.displayArtists()}
                    {quizBtn}
                </div>
            </div>
        );
    }
}

export default SelectedArtists;
