import YOUR_API_KEY from '../configure.js';
const httpOptions = {
    headers: {'X-Mashape-Key': YOUR_API_KEY}

};

const DinnerModel = function () {


    let observers = [];


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

export const modelInstance = new DinnerModel();
