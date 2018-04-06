import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";



class SelectedArtists extends Component {

    constructor(props){
        super(props);
        this.state = {
            artists: [null, null, null, null, null]
        }
        this.props.store.subscribe(()=>this.setState({}));
    }

    componentDidMount() {
        this.props.model.addObserver(this)
    }

    update() {
        this.setState({
            artists : [null, null, null, null, null] //TODO
        })
    }
    refresh = function() {
        return;
    }

    setArtists = function(name, id){
        this.props.model.setArtist(name, id);

    }

    dispatchArtist = function(){
        for(var i = 1; i < 6; i++){
            this.props.store.dispatch({
                type:'ADD_ARTIST',
                artistObject : this.props.model.searchArtist(this.props.model.getArtists(i))
            });
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
                        <br/><br/>
                        <input type="text" id="search5" onChange = {(event) => this.setArtists(event.target.value, 5)}></input>
                        <br/><br/>
                        <button className="btn btn-info">Submit</button>
                    </div>
                    <div className = "buttons">
                        <Link to="/questions/1">
                            <button className="btn btn-info" onClick = {() => this.props.changeStatus()}> Take the quiz !</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedArtists;
