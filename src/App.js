
import React from 'react';
import './App.css';

class App extends React.Component {
  

  constructor() {
    super()
    // Initialise component state
    this.state = {
      joke: null,
      isFetchingJoke: false
    }
    this.onTellJoke = this.onTellJoke.bind(this)
  }

  // Load a joke to initially appear on page load
  componentDidMount() {
    this.fetchJoke()
  }

  // Fetch random dad joke from API
  fetchJoke() {
    this.setState({ isFetchingJoke: true })
    fetch("https://icanhazdadjoke.com/", {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        // Update state to joke string
        this.setState({ 
          joke: json.joke,
          isFetchingJoke: false
        })
      })
  }

  
  onTellJoke() {
    this.fetchJoke()
  }

  render() {
    console.log('----- RENDER -----')

    return (
      <div>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell me a joke!</button>
        <p>{this.state.isFetchingJoke ? 'Loading joke...' : this.state.joke}</p>
      </div>
      
    );
  }
  

  
}

export default App;
