import React from "react";

import ImageBtn from "./ImageDiv";
import AddColumnBtn from "./AddColumnBtn";

/**
 * Columns class as react component
 */
export default class Columns extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "col"
        }
    }
  handleChange = (key, event) => {
    this.props.addColumnName(event.target.value, key);
  }

  /**
   * Columns render starts here...
   */
  render(){
      return(
        <thead>
            <tr>
                <th></th>
                {/*Custom Image and label poriton*/}
                {this.props.columns.map(i =>
                    <th key={(i.key)}>
                        <ImageBtn keyValue={i.key}
                                addImage={this.props.addImage}
                                removeColumn={this.props.removeColumn}
                                isColumn={true}/>
                        <input type="text"	placeholder={i.key}
                            onBlur={this.handleChange.bind(this, i.key)}
                                style={{border: 'none'}}/>
                    </th>	
                )}
                {/*Add new column button*/}
                <th><AddColumnBtn addColumn={this.props.addColumn}/></th>
            </tr>
        </thead>
        
    );
    // columns render ends here
  }
};