import React from 'react';
import SearchResult from './SearchResult';
import ListItemTags from './ListItemTags';
import './App.css';


class SearchInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataSet: [],
      filterData: [],
      tagItem: []
    }
  }

  componentWillMount(){
    this.setState ({
      dataSet: this.props.dataSet.starReview
    })
  }

  listItemOnClick = (value, listItemIndex) => {
    const filterListArray = document.getElementsByClassName("List-border")
    let [tagItemArray, newListAfterEvent]=[{},[]]
    Array.prototype.forEach.call(filterListArray, (ele, index) => {
      if(filterListArray[index]===filterListArray[listItemIndex]){
        return filterListArray[index].style.background = 'lightgray'
      }
    })
      
    if(this.state.tagItem.length < 5){
      tagItemArray = {tagItem: value, listIndx: listItemIndex}
      newListAfterEvent.push(tagItemArray)
    }
    this.setState ({
      tagItem : [...this.state.tagItem, ...newListAfterEvent]
    })
  }

  getInput = (e) => {
    if(e.target.value === ''){
      this.setState({
        filterData: [],
        tagItem: []
      })
    }else {
      let searchData = this.state.dataSet.filter(ele => 
        ele.keycomments.substr(0, 3)===e.target.value
      )
      this.setState({
        filterData: [...searchData]
      })
    }
  }

  tagEvent = (tagIndexValue) => {
    const removeTags = this.state.tagItem.filter((element) => element.listIndx !== tagIndexValue)
    const filterListArrayClick = document.getElementsByClassName("List-border")
    Array.prototype.forEach.call(filterListArrayClick, () => {
      return filterListArrayClick[tagIndexValue].style.background = 'white'
    })
    this.setState({
      tagItem: [...removeTags]
    })
  }
  
  render(){
    console.log(this.state.tagItem)
    return (
      <div className = 'Container'>
        <ListItemTags 
          TagItem = {this.state.tagItem}
          UserInput = {this.getInput}
          TagEvent = {this.tagEvent}
        />
        <SearchResult FilterData = {this.state.filterData} TagItemEmpty = {this.state.tagItem} ListItem = {this.listItemOnClick} />
      </div>
    )
  }
}

export default SearchInput;