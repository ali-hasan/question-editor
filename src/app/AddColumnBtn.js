import React from "react";

/**
 * Add column button component
 */
export default class AddColumnBtn extends React.Component {
    constructor(){
        super();
    }
    render(){
        return(
            <i className="fa fa-plus green" onClick={this.props.addColumn}></i>
        );
    }
}