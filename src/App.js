
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
  }

  // Load a joke to initially appear on page load
  componentDidMount() {
    this.searchJokes()
  }

  // Search API for a joke
  searchJokes() {
    this.setState({ isFetchingJoke: true })

    fetch("https://icanhazdadjoke.com/search", {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        const jokes = json.results
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

  render() {
    return (
      <div>
        <form>
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
