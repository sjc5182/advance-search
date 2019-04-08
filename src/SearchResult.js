import React from 'react';
import { List } from 'semantic-ui-react';
import './App.css';

class SearchResult extends React.Component {
  render(){
    const { FilterData, ListItem } = this.props
    return (
      <div className = 'List-Wrapper'>
        {FilterData.map((element, index) =>
          <div className = "List-border" key={index}>
          <List.Item onClick = {() => {
            ListItem(element.keycomments.substring(0,3).toLowerCase(), index, false)}}>
            {element.keycomments.substring(0, 28).toLowerCase()} 
          </List.Item>
          </div>
        )}
      </div>
    )
  }
}

export default SearchResult;