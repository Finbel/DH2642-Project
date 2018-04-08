import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
        }
    }

    nextQuestion = function(){
        let question = modelInstance.getRandomQuestion();
        modelInstance.addAskedQuestion(question);
        let artists = modelInstance.getArtists();
        let goodArtist = artists[modelInstance.getRandomInt(artists.length)]; //Don't know how to get the result
        //let songs = modelInstance.getSongs(goodArtist);
        //let goodSong = songs[modelInstance.getRandomInt(5)];
        console.log(goodArtist);
        switch(question.id){
            case 0:
                //Pick up the name of the song goodSong
                //Propose the 4 singers
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
        return question.question;
    }

    render() {
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
