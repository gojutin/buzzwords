#Buzzwords

###A demo flash card app using React bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

#### This app is a demo for the `Intro to React` series by the [Long Island JavaScript Group Meetup](https://www.meetup.com/long-island-javascript-group/).

[Visit our Meetup page](https://www.meetup.com/long-island-javascript-group/)

[View the 'Intro to React' slides](http://bit.ly/2l1gbwv)

####Main libraries used in this project:

 Library | What it does
------------ | -------------
[React](https://facebook.github.io/react/) | Manages the view layer and responsible for all DOM manipulation
[Reactstrap](https://reactstrap.github.io/)  | Provides styles Bootstrap 4 components
[Firebase](https://firebase.google.com/) | Realtime NoSQL database used to store the persistant data.

<h2 name="getting-started">Getting Started</h2>

###**Step 1**

`git clone https://github.com/gojutin/buzzwords `

###**Step 2**

Create a new Firebase database at [https://firebase.google.com/](https://firebase.google.com/).

In the Firebase Console, change the Firebase rules to `true` for the **".read"** and **".write"** properties in the **Rules** tab of your database. ***This is not recommended in a production application***

Add your Firebase config object to `src/db.js`.

###**Step 3**

`cd buzzwords `

`npm install`

`npm start`

Open `localhost:3030` in your browser.

Please note that this app does not cover some important concepts, such as 
- testing
- authentication
- read / write privileges
- pagination

## Screenshot

![Screenshot of Buzzwords App](/public/images/screenshot.png?raw=true)
