import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model';
import { Link } from 'react-router-dom';



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            artists: modelInstance.getArtists(),
            nextQuestion: null,
        };
        modelInstance.addObserver(this);
    }

    update(msg){
        if (msg === 'artists') {
            this.setState({
                artists: modelInstance.getArtists()
            });
        }
    }

    /*
    * This function get a random question, get the good artist/song/lyrics associated and create
    * an object with all the information which is stored in the state
    */
    async nextQuestion() {
        const question = modelInstance.getRandomQuestion();
        const artists = this.state.artists;
        let lyrics = null;

        //No need to run again this function if we have already done it
        if (artists.length !== 4 || artists === undefined || this.state.nextQuestion ||
            this.state.goodAnswer || this.state.songs || this.state.userAnswer) {
            return;
        }

        modelInstance.addAskedQuestion(question);

        const goodArtist = artists[modelInstance.getRandomInt(artists.length)];
        // Wait until the promise resolves
        const goodArtistSongs = await modelInstance.getSongs(goodArtist.artist_name);
        // Here we have access to the resolved promise
        const goodSong = goodArtistSongs[modelInstance.getRandomInt(goodArtistSongs.length)];

        if(question.id === 1 || question.id === 2){
            lyrics = await modelInstance.getLyrics(goodSong.track_id);
        }

        if(question.id === 2){
            await this.threeSongs(goodArtist);
        }

        const obj = this.displayQuestion(question, goodArtist, goodSong, lyrics)

        this.setState({
            nextQuestion: obj
        })

    }

    /*
    * This function select 3 random consecutive words in the given text and replace
    * them by "_". The missing words are stored in the state for future verification
    */
    createBlank(verse){
        let words = verse.split(" ");
        let index = modelInstance.getRandomInt(words.length-3);
        let missingwords = [words[index], words[index+1], words[index+2]];
        this.setState({
            goodAnswer: missingwords.join(" ")
        })
        words[3] = "_";
        words[4] = "_";
        words[5] = "_";
        return words.join(" ");
    }


    /*
    * This function pick up 3 different songs from 3 different artists who are
    * not the goodArtist (reponse to the question)
    */
    async threeSongs(goodArtist){
        let songs = [];
        for (var i = 0; i < this.state.artists.length; i++){
            if(goodArtist.artist_id !== this.state.artists[i].artist_id) {
                const song = await modelInstance.getSongs(this.state.artists[i].artist_name);
                songs.push(song[modelInstance.getRandomInt(song.length)]);
            }
        }
        this.setState({
            songs: songs
        })
    }


    /*
    * This function shuffle the order of an array
    */
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }


    /*
    * This function compares the good answer to the user answer and set
    * the success depending on the answer
    */
    submitAnswer(answer){
        if(this.state.userAnswer){
            if (this.state.userAnswer.toLowerCase() === this.state.goodAnswer.toLowerCase()){
                modelInstance.setSuccess(1);
            } else {
                modelInstance.setSuccess(0);
            }
        } else {
            if (answer === this.state.goodAnswer){
                modelInstance.setSuccess(1);
            } else {
                modelInstance.setSuccess(0);
            }
        }
    }


    /*
    * This method select a verse among all the possible verses. It has to contain more
    * than 15 words otherwise it is too short.
    */
    selectVerse(verses){
        let index;
        do {
            //max number is verses.length-1 otherwise we can select the "This lyrics is NOT for commercial use"
            index = modelInstance.getRandomInt(verses.length-1);
        }
        while(verses[index].length < 15);
        return verses[index];
    }


    /*
    * this function construct the question object depending on the question
    */
    displayQuestion = function(question, goodArtist, goodSong, lyrics){
        let questionParam;
        let answers;
        let verses;
        switch(question.id){
            case 0:
                //Pick up the name of the song goodSong
                //Propose the 4 singers
                this.setState({
                    goodAnswer: goodArtist.artist_name
                });
                questionParam = goodSong.track_name;
                answers = <div>
                    <div className="row">
                        <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: this.state.artists[0].artist_name}); event.target.style.background = 'grey'}}> {this.state.artists[0].artist_name} </div>
                        <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: this.state.artists[1].artist_name}); event.target.style.background = 'grey'}}> {this.state.artists[1].artist_name} </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: this.state.artists[2].artist_name}); event.target.style.background = 'grey'}}> {this.state.artists[2].artist_name} </div>
                        <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: this.state.artists[3].artist_name}); event.target.style.background = 'grey'}}> {this.state.artists[3].artist_name} </div>
                    </div>
                </div>
                break;
            case 1:
                //Pick up the id of the song goodSong
                //Make an API call to have the lyrics
                //Select a piece of lyrics
                //Remove some words in this piece of lyrics
                //Input for the missing words
                //verify the matching
                verses = lyrics.lyrics_body.split("\n\n");
                let goodVerse = this.selectVerse(verses);
                questionParam = <div>{goodArtist.artist_name} - {goodSong.track_name} <br/> {this.createBlank(goodVerse)}</div>;
                answers = <input type="text" onChange={(event) => this.setState({userAnswer: event.target.value})}>
                </input>
                break;
            case 2:
                //Pick up the id of the song goodSong
                //Get songs of the other artists by doing an API call (getSongs)
                //Display a piece of lyrics
                //Propose 4 songs
                this.setState({
                    goodAnswer: goodSong.track_name,
                    userAnswer: ""
                });
                verses = lyrics.lyrics_body.split("\n\n");
                let songs = this.state.songs;
                songs.push(goodSong);
                console.log(songs);
                songs = this.shuffle(songs);
                answers = <div>
                        <div className="row">
                            <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: songs[0].track_name}); event.target.style.background = 'grey'}}> {songs[0].track_name} </div>
                            <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: songs[1].track_name}); event.target.style.background = 'grey'}}> {songs[1].track_name} </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: songs[2].track_name}); event.target.style.background = 'grey'}}> {songs[2].track_name} </div>
                            <div className="col-md-6" onClick={(event) => {this.setState({userAnswer: songs[3].track_name}); event.target.style.background = 'grey'}}> {songs[3].track_name} </div>
                        </div>
                    </div>
                questionParam = this.selectVerse(verses);
                break;
            default:
                break;
        }
        return {quest : question.question, param: questionParam, ans : answers};
    }


    render() {
        let id = modelInstance.getNumberOfAskedQuestion() + 1;
        let path;
        if(id === 11){
            path = "/finalpoints"
        } else {
            path = "/questions/"+id;
        }
        this.nextQuestion();
        const nextQuestion = this.state.nextQuestion;
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    {nextQuestion != null && <div>{nextQuestion.quest} <br/>{nextQuestion.param} <br/> {nextQuestion.ans}</div>}<br/>
                </div>
                <Link to ={path}>
                    <button onClick={()=>this.submitAnswer()}>Next Question</button>
                </Link>
            </div>
        );
    }
}

export default RunningQuiz;