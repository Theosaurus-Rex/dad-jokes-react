
import React from 'react';
import './App.css';

class App extends React.Component {
  

  constructor() {
    super()
    // Initialise component state
    this.state = {
      joke: null
    }
    this.onTellJoke = this.onTellJoke.bind(this)
  }
  // Fetch random dad joke from API
  onTellJoke() {
    fetch("https://icanhazdadjoke.com/", {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        // Update state to joke string
        this.setState({ joke: json.joke })
      })
  }

  render() {
    console.log('----- RENDER -----')

    return (
      <div>
        <button onClick={this.onTellJoke}>Tell me a joke!</button>
        <p>{this.state.joke}</p>
      </div>
      
    );
  }
  

  
}

export default App;
