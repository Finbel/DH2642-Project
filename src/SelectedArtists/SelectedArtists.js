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

    changeStatus(){
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

    setArtists = function(name, id){
        this.props.model.setArtistsName(name, id);

    }

    setInput(name){
        this.setState({
            input: name
        });
    }

    takeQuiz = function(){
        this.changeStatus();
        for(var i = 1; i < 5; i++){
            console.log(this.props.model.getArtistsName(i).split(" "));
            var name = this.props.model.getArtistsName(i).split(" ");
            name = name.join("+");
            this.props.model.searchArtist(name).then(j => {
                console.log(j);
                this.props.model.addArtists(j)
            })

        }
    }

    displayRandomArtists = function(){
        return this.state.suggestion.map((artist) =>
            <div className="col-md-2"><button onClick={() => {
                this.props.model.searchArtist(artist).then(data =>
                    this.props.model.addArtists(data[0])).catch( () =>
                console.log('error'))
            }}>{artist}</button></div>
        );
    }

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
    }

    displayArtists = function(){
        if(this.state.search) {
            return this.state.search.map(artist =>
                <div className="col-md-2"><button onClick={() => this.props.model.addArtists(artist)}>
                    {artist.artist_name}
                </button></div>)
        }
    }


    render() {
        let waitForArtists = null;
        switch (this.state.searchStatus) {
            case 'initial':
                waitForArtists = null;
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

        return (
            <div className="SelectedArtists">
                <Sidebar model={this.props.model} store={this.props.store}/>
                <div className="col-md-7">
                    <div className="row">Suggestion :</div>
                    <div className="row">{this.displayRandomArtists()}</div>
                    <div className="row">
                        Didn't find artists you want? You can type in your favourite artists here : <br/><br/>
                        <div className="typein">
                            <div className="col-md-3">
                                <input type="text" id="search1" onChange = {(event) => this.setInput(event.target.value)}></input>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-info" onClick={() => this.search()}>search</button>
                            </div>
                        </div>
                    </div>
                    {waitForArtists}
                    {this.displayArtists()}
                    <div className = "buttons">
                        <Link to="/questions/1">
                            <button className="btn btn-info" onClick = {() => this.takeQuiz()}> Take the quiz !</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedArtists;
