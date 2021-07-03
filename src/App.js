import './App.css';
import React from 'react';
import People from './Components/People/People';
import Search from './Components/Search/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      swapiData: [],      // data I pull from star wars API
      characterData: [],  // data I create from varius API fetches (name, film, species) for each person
      searchInput:""      // search input from user
    }
  }

  // fetch all data and set state when App first runs
  async componentDidMount() {
    const response = await fetch('https://swapi.dev/api/people/')
    const peopleJSON = await response.json();
    const people = peopleJSON.results;
    this.setState({swapiData: people});
    
    this.state.swapiData.forEach(async person => {
      // get the films from the current person from swapiData
      var characterFilms = [];
      person.films.forEach(async filmURL => {
        const response = await fetch(filmURL);
        const filmJSON = await response.json();
        const filmTitle = filmJSON.title;

        characterFilms.push(filmTitle);
      });

      // get the species from the current person from swapiData
      var characterSpecies = [];
      if (person.species.length === 0) {
        characterSpecies.push("No Species Specified in API")
      } else {
        person.species.forEach(async speciesURL => {
          const response = await fetch(speciesURL);
          const speciesJSON = await response.json();
          const speciesName = speciesJSON.name;

          characterSpecies.push(speciesName);
        });
      }
      
      // set the state's characterData equal to {Name, Films, Species}
      this.setState(prevState => (
        {characterData:prevState.characterData.concat({Name: person.name, Films: characterFilms, Species: characterSpecies})}
      ))
    });
  }

  // set searchInput state when the user changes the text box input
  handleChange = (e) =>{
    this.setState({searchInput:e.target.value})
  }
  
  render() {
    const { characterData, searchInput } = this.state;
    // only render the people that are included in the search term
    // OR render everyone if search input is an empty string
    const filteredPeople = characterData.filter(person =>(
      searchInput === '' || person.Name.toLowerCase().includes(searchInput.toLowerCase())
    ))

    return (
      <div className="App">
        <h1>SWAPI People Web App</h1>
        <Search handleChange={this.handleChange}/>
        <p key="line-separator between search and people"> </p>
        <People characterData={filteredPeople}/>
      </div>
    )  
  }
}

export default App;
