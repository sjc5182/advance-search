import React, { Component } from 'react';
import './App.css';
import SearchInput from './SearchInput';


class App extends Component {
  render() {
    const dataSet = {
      starReview: [
        {keycomments: 'Wow, this is Really Good Food'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'I will come back again for your food again'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'Wow, you guys have the best food in town'},
        {keycomments: 'I will come back again for your food again'},
        {keycomments: 'horrible, just horrible food'},
        {keycomments: 'not come back again, never in my life'},
        {keycomments: 'show me the refund policy, food is just bad'},
        {keycomments: 'I wonder if they even have manager on the floor'},
        {keycomments: 'my friend got really sick, should I report to health department'}
      ]
    }
    return (
      <div className="App">
        <header className="App-header">
          <SearchInput dataSet = {dataSet} />
        </header>
      </div>
    );
  }
}

export default App;
