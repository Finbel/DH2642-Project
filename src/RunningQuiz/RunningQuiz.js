import React, { Component } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { modelInstance } from '../data/Model'



class RunningQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            askedQuestions : modelInstance.getAskedQuestions(),
            artists: modelInstance.getArtists(),
            nextQuestion: null,
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
        console.log("nexquestion()")
        const question = modelInstance.getRandomQuestion();
        const artists = this.state.artists;
        let lyrics = null;
        if (artists.length !== 4 || artists === undefined || this.state.nextQuestion || this.state.missingWords || this.state.songs) {
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
        // Here you should have access to obj
        this.setState({
            nextQuestion: obj
        })

    }

    createBlank(verse){
        //TO CHANGE
        let words = verse.split(" ");
        let missingwords = [words[3], words[4], words[5]];
        this.setState({
            missingWords: missingwords.join(" ")
        })
        words[3] = "_";
        words[4] = "_";
        words[5] = "_";
        return words.join(" ");
    }

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

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    displayQuestion = function(question, goodArtist, goodSong, lyrics){
        let questionParam;
        let answers;
        let verses;
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
                verses = lyrics.lyrics_body.split("\n\n");
                questionParam = <div>{goodArtist.artist_name} - {goodSong.track_name} <br/> {this.createBlank(verses[1])}</div>;
                answers = <input type="text" onChange={(event) => this.setState({userAnswer: event.target.value})}>
                </input>
                break;
            case 2:
                //Pick up the id of the song goodSong
                //Get songs of the other artists by doing an API call (getSongs)
                //Display a piece of lyrics
                //Propose 4 songs
                verses = lyrics.lyrics_body.split("\n\n");
                let songs = this.state.songs;
                songs.push(goodSong);
                console.log(songs);
                songs = this.shuffle(songs);
                answers = <div>{songs[0].track_name} <br/> {songs[1].track_name} <br/> {songs[2].track_name} <br/> {songs[3].track_name}</div>
                questionParam = verses[2];
                break;
            default:
                break;
        }
        return {quest : question.question, param: questionParam, ans : answers};
    }

    render() {
        this.nextQuestion()
        const nextQuestion = this.state.nextQuestion
        return (
            <div className="RunningQuiz">
                <Sidebar model={modelInstance} store={this.props.store}/>
                <div className="col-md-7">
                    {nextQuestion != null && <div>{nextQuestion.quest} <br/>{nextQuestion.param} <br/> {nextQuestion.ans}</div>}<br/>
                </div>
            </div>
        );
    }
}

export default RunningQuiz;