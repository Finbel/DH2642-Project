import YOUR_API_KEY from '../configure.js';
const httpOptions = {
    headers: {'X-Mashape-Key': YOUR_API_KEY}

};

const Model = function () {

    let artistsName = [null, null, null, null, null];
    let artists = [];
    let observers = [];
    let asked = [];
    let questions = ["Who posted this photo ?", "Which picture has the more likes ?", "Who has the more followers ?",
        "What is the most popular hashtag ?", "Which picture matches the following text ?", "Which text matches the following pictures ?"];

    this.setArtistsName = function(name, id){
        artistsName[id-1] = name;
    }

    this.getArtistsName = function (id){
        if (id === 0){
            return artistsName;
        }
        return artistsName[id-1];
    }

    this.addArtists = function(artist){
        artists.push(artist);
    }

    this.getArtists = function(){
        return artists;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    this.getRandomQuestion = function () {
        return questions[getRandomInt(questions.length)];
    }

    this.addAskedQuestion = function(question) {
        asked.add(question);
        notifyObservers();
    }

    this.getNumberOfAskedQuestion = function() {
        return asked.length;
    }


    // API Calls

    this.getLyrics = function(id){
        var param = 'track_id='+id;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?${param}`
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)

    }

    this.searchLyrics = function(artist, song){
        var param = 'q_artist=' + artist + '&q_track=' + song;
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?${param}`
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
    }

    this.searchArtist = function(name){
        var param = 'page=1&page_size=5&q_artist=' + name + '&s_artist_rating=desc';
        const url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.search?${param}`;
        return fetch(url, httpOptions)
            .then(processResponse)
            .catch(handleError)
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

    const notifyObservers = function () {
        observers.forEach(o => o.update());
    };
};

export const modelInstance = new Model();
