import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import './SelectedArtists.css';
import imgURL from './../SelectedArtists/firstpart.png';
import imgURL1 from './../SelectedArtists/secondpart.png';
import imgURL2 from './../SelectedArtists/thirdpart.png';


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
            <div className="col-md-2 every" key={artist.artist_id}><button className="buttondisplay" onClick={() => {
                this.props.model.searchArtist(artist).then(data =>
                    this.props.model.addArtists(data[0])).catch( () =>
                console.log('error'));
                console.log("click")
            }}>{artist}</button></div>
        );
    };

    async search(){
        this.setState({
            searchStatus:'loading'
        });
        let artists = await this.props.model.searchArtist(this.state.input);
        let artistsWithSongs = [];
        for(var i = 0; i < artists.length; i++){
            this.props.model.getSongs(artists[i].artist_name).then(data => {
                if(data.length > 0){
                    artistsWithSongs.push(artists[i]);
                }
                this.setState({
                    searchStatus: 'LOADED',
                    search : artists
                });
            }).catch(() => {
                this.setState({
                    status: 'ERROR'
                })
        })
        };
    };



    displayArtists = function(){
        if(this.state.search) {
            if(this.state.search.length === 0){
                return "Sorry, we couldn't find any songs related to this artist."
            }
            return this.state.search.map(artist =>
                <div className="col-md-2"><button className="buttondisplay" onClick={() => this.props.model.addArtists(artist)}>
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
                    <div className="col-md-8 content">
                        <div className="row first">
                        <div className = "instruction"><img src={imgURL} />  Choose 4 artists then take the quiz !</div>
                        <div className = "detail">you can select recommended ones or choose your own :)</div>
                        </div>

                        <div className="row instruction">
                            <div className="secondrow">
                            <img src={imgURL1} />  Suggestion :
                            </div>
                        </div>
                        <div className="row displayartists">{this.displayRandomArtists()}</div>
                        
                        <div className="thirdrow">
                            <div className="row instruction">
                              <img src={imgURL2} />  Didn't find artists you want? You can type in your favourite artists here : <br/><br/>
                            </div>
                            <div className="typein">
                                <div className="col-md-3">
                                    <input type="text" id="search1" onChange = {(event) => this.setInput(event.target.value)}></input>
                                </div>
                                <div className="col-md-2">
                                    <button className="searchbutton" onClick={() => this.search()}>search</button>
                                   
                                </div>
                            </div>
                        </div>
                        <div className = "row display">
                        
                        {waitForArtists}
                        {this.displayArtists()}
                        </div>
                            <div className = "takequiz">
                            {quizBtn}
                            </div>
                    </div>
            </div>
        );
    }
}

export default SelectedArtists;
