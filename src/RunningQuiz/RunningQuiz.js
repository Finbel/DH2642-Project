import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
            artists: modelInstance.getArtists(),
            songs: []
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

    nextQuestion = function() {
        let question = modelInstance.getRandomQuestion();
        let artists = this.state.artists;
        if (artists.length !== 4 || artists === undefined) {
            return;
        }
        modelInstance.addAskedQuestion(question);
        console.log("added question");

        console.log(artists);
        let goodArtist = artists[modelInstance.getRandomInt(artists.length)][0];
        console.log(goodArtist);
        let goodSong;
        modelInstance.getSongs(goodArtist.artist_name).then((data) => {
            goodSong = data[modelInstance.getRandomInt(data.length)];
            console.log(this.displayQuestion(question, goodArtist, goodSong));
            let obj = this.displayQuestion(question, goodArtist, goodSong);
            /* Here, I want to return the HTML code I want to display on the screen
            * but it doesn't work in the .then() function apparently.
            * Don't know how to return the object I need here. I can't put a return
            * at line 51 (after the then()) otherwise the API call won't be finished */
            //return <div>{obj.quest} {obj.param} <br/> {obj.ans}</div>
        });

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
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    {this.nextQuestion()} <br/>
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
