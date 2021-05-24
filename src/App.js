
import React from 'react';
import './App.css';
import SearchForm from './SearchForm'

class App extends React.Component {
  

  constructor() {
    super()
    // Initialise component state
    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJokes: false
      
    }
    this.onSearchChange = this.onSearchChange.bind(this)
    this.searchJokes = this.searchJokes.bind(this)
  }

  // Search API for a joke
  searchJokes(limit = 20) {
    this.setState({ isFetchingJokes: true })

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`, {
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
          isFetchingJokes: false
        })
        })
      }
    

  
  


  onSearchChange(value) {
    this.setState({ searchTerm: value })
  }


  renderJokes() {
    return (
      <ul>
        {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    )
  }

  render() {
    return (

      <main>
        <h1 contenteditable className="joogle-logo">
          <span className="blue-letter">J</span>
          <span className="red-letter">o</span>
          <span className="yellow-letter">o</span>
          <span className="blue-letter">g</span>
          <span className="green-letter">l</span>
          <span className="red-letter">e</span>
        </h1>
        <h3 className="tagline">The Dad Joke Search Engine</h3>
        <SearchForm 
          onFormSubmit={this.searchJokes} 
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
        />
        
        {this.state.isFetchingJokes
          ? <p>Searching for jokes...</p>
          : this.renderJokes()
        }
        
      </main>
      
    );
  }
  

  
}

export default App;
