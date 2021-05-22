
import React from 'react';
import './App.css';

class App extends React.Component {
  

  constructor() {
    super()
    // Initialise component state
    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJoke: false
      
    }
    this.onTellJoke = this.onTellJoke.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  // Search API for a joke
  searchJokes() {
    this.setState({ isFetchingJoke: true })

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        const jokes = json.results
        console.log('jokes', jokes)
        this.setState({
          jokes, 
          isFetchingJoke: false
        })
        })
      }
    

  
  onTellJoke() {
    this.searchJokes()
  }


  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    this.searchJokes()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search for a joke..." 
            onChange={this.onSearchChange}
          />
          <button>Search</button>
          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell me a joke!</button>
        </form>
        <p>{this.state.jokes.toString()}</p>
      </div>
      
    );
  }
  

  
}

export default App;
