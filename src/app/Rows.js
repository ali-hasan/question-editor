import React from "react";


import ImageBtn from "./ImageDiv";

/**
 * Rows class as react component
 */
const RadioBtn = (props) => {

	return(
        <input type="radio" name={props.name}/>
    );
}

//rows
export default class Rows extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "row"
        }
    }
    
    handleChange = (key, event) => {
        this.props.addRowName(event.target.value, key);
    }
    handleSelected = (key) => {
        this.props.markSelected(key);
    }

    /**
     * render rows starts here...
     */
    render(){
        return(
            <tbody>
                {this.props.rows.map(i =>
                <tr key={i.key}>
                    <td>
                        <ImageBtn keyValue={i.key}
                                addImage={this.props.addImage}
                                removeRow={this.props.removeRow}
                                isColumn={false}/>
                        <input type="text" placeholder={i.key}
                            onBlur={this.handleChange.bind(this, i.key)}
                            style={{border: 'none'}}/>
                    </td>
                    {
                        this.props.columns.map(i => 
                            <td key={i.key}>
                                <RadioBtn name={i.key}/>
                            </td>
                    )}
                </tr>
                )}
            </tbody>
        );
    }

    //row renders ends here

	
}