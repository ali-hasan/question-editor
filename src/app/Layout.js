import React from "react";
var _ = require('lodash');

//Custom imports
import Columns from "./Columns";
import Rows from "./Rows";
import AddRowBtn from "./AddRowBtn";

// Question title
const Question = (props) => {
	return(
  	<input placeholder="Title of the quesiton"
            style={{border: 'none'}} />
  );
}

export default class Layout extends React.Component {
  //constructor
  constructor(){
    super();
    this.state = {
      columns: [],
      rows: [],
      images: [],
    };
  }
  
  /**
   * add columns to the columns array
   */
  addColumn = () => {
    this.setState(prevState => ({
      columns: prevState.columns.concat({
        key: _.uniqueId('col'), 
        name: '',
        selected : false,
      }) 
    }));
  }

  /**
   * add columns to the rows array
   */
  addRow = () => {
    this.setState(prevState => ({
      rows: prevState.rows.concat({
        key: _.uniqueId('row'), 
        name: '',
      }) 
    }));
  }

  /**
   * Sets each row and column label title by providing its name, key and list of items
   */
  attachLabel = (name, key, searchList, isColumn) => {
    searchList.map((item) => {
      if(item.key === key){
        item.name = name;
      }
    });
    if(isColumn){
      this.setState({
        columns: searchList
      });
    }else{
      this.setState({
        rows: searchList
      });
    }
  }

  /**
   * Sets each column label
   */
  addColumnName = (name, key) => {
    this.attachLabel(name, key, this.state.columns, true);
  }
  /**
   * Sets each row label
   */
  addRowName = (name, key) => {
    this.attachLabel(name, key, this.state.rows, false);
  }

  /**
   * Add new image to images array
   */
  addImage = (key) => {
    this.setState(prevState => ({
      images: prevState.images.concat({key: key}) 
    }));
  }

  /**
   * Remove row and coloumn from respective arrays 
   */
  removeItem = (key, items, images, isColumn) => {
    items = items.filter(x=>x.key !== key);
    var images = images.filter(x=> x.key !== key);
    this.findLongestLabel(items);
    this.findShortestLabel(items);
    if(isColumn){
        this.setState({
        columns: items,
        images: images
      });
    }else{
      this.setState({
        rows: items,
        images: images
      });
    }
  }

  /**
   * Remove columns method
   */
  removeColumn = (key) => {
    this.removeItem(key, this.state.columns, this.state.images, true);
  }

  /**
   * Remove row method
   */
  removeRow = (key) => {
    this.removeItem(key, this.state.rows, this.state.images, false);
  }

  /**
   * Find shortest label length
   */
  findLongestLabel = (list) => {
    return list.reduce((longest, item) => {
      if(item.name.length > longest){
        return longest = item.name.length;
      }else{
        return longest;
      }
    }, 0);
  }

  /**
   * Find longest label length
   */
  findShortestLabel = (list) => {
    return list.reduce((shortest, item) => {
      if(item.name.length < shortest){
        return shortest = item.name.length;
      }else{
        return shortest;
      }
    }, this.findLongestLabel(list));
  }

  
  /**
   * Render Quesiotn Editor App
   */
  render(){
    const { columns, rows, images } = this.state;
    return(
      <div className="row">

        	<div className="col-xs-12">
          	<h4> Question Editor View </h4>
            <Question />

            <table>
              {/*Add Columns for the Question Editor matrix*/}
              <Columns columns={columns}
                          addColumnName={this.addColumnName.bind(this)}
                          addColumn={this.addColumn}
                          addImage={this.addImage}
                          removeColumn={this.removeColumn}/>
              
              {/*Add Rows for the Question Editor matrix*/}
              <Rows rows={rows}
                columns={columns}
                addRowName={this.addRowName.bind(this)}
                addImage={this.addImage}
                removeRow={this.removeRow}
                selectItem={this.selectItem}/>
              
            </table>
            
            {/*Add new row + button */}
            <AddRowBtn addRow={this.addRow}/>
            
          </div>
          
          {/*Quesiton editor Summary*/}
          <div className="col-lg-4 col-md-12">
          	<h4> Question Summary View </h4>
            <label>Summary</label>
            <table >
              <tbody>
                <tr>
                  <td>Number of rows:  {rows.length} </td>
                </tr>
                <tr>
                  <td>Number of Columns:  {columns.length} </td>
                </tr>
                <tr>
                  <td>Number of Images Uploaded:  {images.length} </td>
                </tr>
                <tr>
                  <td>Longest Row Label:  {this.findLongestLabel(rows)} </td>
                </tr>
                <tr>
                  <td>Shortest Row Label:  {this.findShortestLabel(rows)} </td>
                </tr>
                <tr>
                  <td>Longest Column Label:  {this.findLongestLabel(columns)} </td>
                </tr>
                <tr>
                  <td>Shortest Column Label:  {this.findShortestLabel(columns)} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}