import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";



class SelectedArtists extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'initial',
            artists: this.props.model.getArtists()
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
    refresh = function() {
        return;
    }

    setArtists = function(name, id){
        this.props.model.setArtistsName(name, id);

    }

    takeQuiz = function(){
        this.changeStatus();
        for(var i = 1; i < 5; i++){
            console.log(this.props.model.getArtistsName(i).split(" "));
            var name = this.props.model.getArtistsName(i).split(" ");
            name = name.join("+");
            this.props.model.addArtists(this.props.model.searchArtist(name));
        }
    }


    render() {
        return (
            <div className="SelectedArtists">
                <Sidebar model={this.props.model} store={this.props.store}/>
                <div className="col-md-7">
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
                    <div className="row">
                        You can chose your own celebrities here : <br/>
                        <input type="text" id="search1" onChange = {(event) => this.setArtists(event.target.value, 1)}></input>
                        <br/><br/>
                        <input type="text" id="search2" onChange = {(event) => this.setArtists(event.target.value, 2)}></input>
                        <br/><br/>
                        <input type="text" id="search3" onChange = {(event) => this.setArtists(event.target.value, 3)}></input>
                        <br/><br/>
                        <input type="text" id="search4" onChange = {(event) => this.setArtists(event.target.value, 4)}></input>
                    </div>
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
