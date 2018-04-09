import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
            artists: modelInstance.getArtists(),
            goodSong: modelInstance.getGoodSong()
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

        if(msg === "song"){
            this.setState({
                goodSong: modelInstance.getGoodSong()
            })
        }

    }

    nextQuestion = function(){
        let question = modelInstance.getRandomQuestion();
        let artists = this.state.artists;
        let goodSong;
        if (artists.length !== 4 || artists === undefined){
            return;
        }
        modelInstance.addAskedQuestion(question);
        console.log("added question");

        console.log(artists);
        let goodArtist = artists[modelInstance.getRandomInt(artists.length)][0]
        console.log(goodArtist);
        modelInstance.getSongs(goodArtist.artist_name)
            .then(data => goodSong = data[modelInstance.getRandomInt(5)])
            .then(() => {
                let questionParam;
                let answers;
                switch(question.id){
                    case 0:
                        //Pick up the name of the song goodSong
                        //Propose the 4 singers
                        let questionParam = goodSong.track_name;
                        let answers = <div>{artists[0].artist_name} <br/>
                            {artists[1].artist_name} <br/>
                            {artists[2].artist_name} <br/>
                            {artists[3].artist_name}
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
                console.log(questionParam)

                return question.question;
            })
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
