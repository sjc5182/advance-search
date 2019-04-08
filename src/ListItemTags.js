import React from 'react'
import './App.css';

export default (props) => {
  const { TagItem, UserInput, TagEvent} = props;
  return(
    <div className = 'Outter-container'>
      <div className = 'Outer-input'>
        <div className = 'Tag-Wrapper'>
          {TagItem.map((tags, index) => <div key = {index} className = 'Input-tag' onClick = {() => TagEvent(tags.listIndx)}>{tags.tagItem}</div>       
          )}
        </div>
        <div className = 'Input-wrapper'>
          <input icon='search' placeholder='Search...' onChange = {UserInput} >
          </input>
        </div>
      </div>
    </div>
  )
};
