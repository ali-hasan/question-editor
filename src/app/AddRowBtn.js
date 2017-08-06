import React from "react";

/**
 * Add row button component
 */
export default class AddRowBtn extends React.Component {
    constructor(){
        super();

    }
    render(){
        return(
            <i className="fa fa-plus green" onClick={this.props.addRow}></i>
        );
    }
	
}