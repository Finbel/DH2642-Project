var KEY = require("../configure.js")
const httpOptions = {
    headers: {'X-Mashape-Key': KEY.YOUR_API_KEY}
};

const Model = function () {

    let suggestions = ["Beyonce", "Bruno Mars", "Drake", "Lady Gaga", "Coldplay", "Rihanna",
    "Eminem", "Justin Bieber", "Katy Perry", "Ed Sheeran", "Shakira", "Luis Fonsi"]
    let artists = [];
    let observers = [];
    let asked = [];
    let questions = [
        {question: "Who this song belongs to ?", id : 0},
         {question: "Complete the lyrics of this song", id:1},
        {question: "Match the lyrics to the song", id :2}];

    var isInArray = function (value, array){
        for (var i = 0; i< array.length; i++){
            if (array[i] === value){
                return true;
            }
        }
        return false;
    }

    this.getRandomArtists = function(){
        let res = [];
        let indexes = [];
        for(var i = 0; i < 5; i++){
            let index = this.getRandomInt(suggestions.length);
            while (isInArray(index, indexes)){
                index = this.getRandomInt(suggestions.length);
            }
            res.push(suggestions[index]);
            indexes.push(index);
        }
        return res;
    }

    this.addArtists = function(artist){
        if(artists.length === 4){
            alert("You can't have more than 4 artists");
            return;
        }
        for(var i = 0; i< artists.length; i++){
            if (artist.artist_id === artists[i].artist_id){
                alert("You've already chosen this artist");
                return;
            }
        }
        artists.push(artist);
        notifyObservers('artists');
    }


    this.removeArtist = function(artist){
        let newArray = [];
        for(var i = 0; i < artists.length; i++){
            if(artists[i].artist_id !== artist.artist_id){
                newArray.push(artists[i]);
            }
        }
        artists = newArray;
        notifyObservers('artists');
    }

    this.getArtists = function(){
        return artists;
    }

    this.getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    this.getRandomQuestion = function () {
        return questions[this.getRandomInt(questions.length)];
    }

    this.addAskedQuestion = function(question) {
        asked.push({question : question.question, id: question.id, index: asked.length+1, success : 2});
        notifyObservers("quest");
    }

    this.getAskedQuestions = function(){
        return asked;
    }

    this.setSuccess = function(success){
        asked[asked.length-1].success = success;
        //notifyObservers("success");
    }

    this.getNumberOfAskedQuestion = function() {
        return asked.length;
    }


    // API Calls

    this.getSongs = function(artist){
        artist = artist.split(" ");
        artist = artist.join("+");
        var param = 'f_has_lyrics=1&page=1&page_size=5&q_track_artist='+artist+'&s_track_rating=desc';
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
    }

    this.getLyrics = function(id){
        var param = 'track_id='+id;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)

    }

    this.searchLyrics = function(artist, song){
        var param = 'q_artist=' + artist + '&q_track=' + song;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
    }

    this.searchArtist = function(name){
        var param = 'page=1&page_size=5&q_artist=' + name + '&s_artist_rating=desc';
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.search?${param}`;
        return fetch(url, httpOptions).then(processResponse).catch(handleError);
    }

    this.getRelatedArtists = function(id){
        var param = 'artist_id=' + id;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.related.get?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
    }

    this.getArtist = function(id){
        var param = 'artist_id=' + id;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.get?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
    }



    // API Helper methods

    const processResponse = function (response) {
        if (response.ok) {
            return response.json()
        }
        throw response;
    }

    const handleError = function (error) {
        if (error.json) {
            error.json().then(error => {
                console.error('API Error:', error.message || error)
            })
        } else {
            console.error('API Error:', error.message || error)
        }
    }

    // Observer pattern

    this.addObserver = function (observer) {
        observers.push(observer);
    };

    this.removeObserver = function (observer) {
        observers = observers.filter(o => o !== observer);
    };

    const notifyObservers = function (msg) {
        observers.forEach(o => o.update(msg));
    };
};

export const modelInstance = new Model();
