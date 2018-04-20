# MusicQuiz

**MusicQuiz** is an interactive music quiz using the [musixmatch API](https://www.musixmatch.com/). Test your knowledge about your favourite artists by answering a number of questions about them and their music. Identify the artist, complete the lyrics, or match the lyrics to its song. Each correct answer gives you additional points, while incorrect answers result in the loss of points. Your final score will be stored in a database, where you can compare your results with your friends.


## Completed work

- Created a skeleton for the **MusicQuiz** application using React.js and Bootstrap.
    - Started to introduce a new layout to existing pages.
- Generate questions using information about artists, songs and lyrics from the **musixmatch API**.
    - Which artist sings this song?
    - Complete the following lyrics...
    - Match the lyrics to the song.
- Deployed the application on a Firebase server.


## Upcoming features

- Continue to develop the new and improved layout.
- Add new and improve existing questions for the quiz.
    - Improve the "complete the lyrics" question.
    - Create and introduce new questions to the quiz.
- Introduce leaderboards to the application.
    - Set up a database on the Firebase server.
    - Save users scores to the leaderboard/database.


## Repository structure

- node_modules/
- **public/** {Public directory deployed on Firebase.}
    - css/
    - js/
    - index.html
- src/
    - **data/** {Model contains functions to manage data and the API.}
    - finalpoints/
        - finalpoints.js
        - finalpoints.css
    - homepage/
        - homepage.js
        - homepage.css
    - **reducer/** {Reducer functions for React-Redux.}
    - **runningQuiz/** {Question generation, submission, next question, etc.}
    - **selectedArtists/** {Select artists view for quiz initialisation.}
        - selectedArtists.js
        - selectedArtists.css
    - **sidebar/** {Sidebar view for the application.}
        - sidebar.js
        - sidebar.css
    - App.js
    - **configure.js** {musixmatch and Firebase API keys.}
    - index.js
- .gitignore
- **firebase.json** {Firebase configuration file.}
- package.json
- README.md