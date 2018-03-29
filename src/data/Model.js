import YOUR_API_KEY from '../configure.js';
const httpOptions = {
    headers: {'X-Mashape-Key': YOUR_API_KEY}

};

const Model = function () {


    let observers = [];
    let asked = [];
    let questions = ["Who posted this photo ?", "Which picture has the more likes ?", "Who has the more followers ?",
        "What is the most popular hashtag ?", "Which picture matches the following text ?", "Which text matches the following pictures ?"];

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
                console.error('getAllDishes() API Error:', error.message || error)
            })
        } else {
            console.error('getAllDishes() API Error:', error.message || error)
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
