import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
            artists: modelInstance.getArtists(),
            songs: [],
            status:'initial'
        }
        modelInstance.addObserver(this);
    }

    update(msg){
        if (msg === 'artists') {
            this.setState({
                artists: modelInstance.getArtists()
            })
            console.log(this.state.artists);
        }

    }

    async nextQuestion() {
        const question = modelInstance.getRandomQuestion();
        const artists = this.state.artists;
        if (artists.length !== 4 || artists === undefined) {
            return;
        }
        modelInstance.addAskedQuestion(question);
        const goodArtist = artists[modelInstance.getRandomInt(artists.length)];
        // Wait until the promise resolves
        const goodArtistSongs = await modelInstance.getSongs(goodArtist.artist_name);
        // Here we have access to the resolved promise
        const goodSong = goodArtistSongs[modelInstance.getRandomInt(goodArtistSongs.length)]
        const obj = this.displayQuestion(question, goodArtist, goodSong)
        // Here you should have access to obj
        console.log(obj)
        this.setState({
            status:'LOADED'
        });
        return (<div>{obj.quest} {obj.param} <br/> {obj.ans}</div>);

    }

    displayQuestion = function(question, goodArtist, goodSong){
    let questionParam;
    let answers;
        switch(question.id){
            case 0:
                //Pick up the name of the song goodSong
                //Propose the 4 singers
                questionParam = goodSong.track_name;
                answers = <div>{this.state.artists[0].artist_name} <br/>
                    {this.state.artists[1].artist_name} <br/>
                    {this.state.artists[2].artist_name} <br/>
                    {this.state.artists[3].artist_name}
                </div>
                break;
            case 1:
                //Pick up the id of the song goodSong
                //Make an API call to have the lyrics
                //Select a piece of lyrics
                //Remove some words in this piece of lyrics
                //Input for the missing words
                //verify the matching
                break;
            case 2:
                //Pick up the id of the song goodSong
                //Get songs of the other artists by doing an API call (getSongs)
                //Display a piece of lyrics
                //Propose 4 songs
                break;
            default:
                break;
        }
        return {quest : question.question, param: questionParam, ans : answers};
    }

    render() {
        console.log(this.nextQuestion())
        let res = null;
        switch(this.state.status){
            case 'initial':
                break;
            case 'LOADED':
                res = this.nextQuestion();
                break;
            default:
                break;
        }
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    {res}<br/>
                    - Prop 1 <br/>
                    - Prop 2 <br/>
                    - Prop 3 <br/>
                    - Prop 4 <br/>
                </div>
            </div>
        );
    }
}

export default RunningQuiz;
