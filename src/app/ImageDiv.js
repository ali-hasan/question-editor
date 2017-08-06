import React from "react";

/**
 * Image div which contains the
 */
export default class ImageDiv extends React.Component {
  constructor(){
    super();
    let imageInputId = "loadImage";
    this.state = {
      childVisible: false
    }
  }
  
  /** remove column handler */
  removeColumnHandler = () => {
    this.props.removeColumn(this.props.keyValue);
  }

  /** remove row handler */
  removeRowHandler = () => {
    this.props.removeRow(this.props.keyValue);
  }

  /**
   * Get the image from user selection and assigns it to the selected div as background
   * set the add image state
   */
  chnageHandler = (key, event) => {
    var target = event.target,
        files = target.files;
    if (FileReader && files && files.length) {
          var fr = new FileReader();
          fr.onload = function () {
              document.getElementById(key).style.background = "url('" + fr.result + "')";
          }
          fr.readAsDataURL(files[0]);
          this.setState({childVisible: !this.state.childVisible});
          this.props.addImage(key);
    }
  }

  /**
   * render Image div starts here...
   */
  render(){
    return(
      /**
       * Main image div which contains the plus button to add image for columns and rows
       * Contains the cross button to remove column and row
       */
     <div className="imageDiv" id={this.props.keyValue}>
          {this.props.isColumn ? 
          <i className="fa fa-times cross"
              onClick={this.removeColumnHandler}></i> : 

              <i className="fa fa-times cross"
              onClick={this.removeRowHandler}></i>
          }
          {
            !this.state.childVisible ?
                <div>
                  <i className="fa fa-plus" onClick={() => document.getElementById(('image' + this.props.keyValue)).click()}></i>
                  <input type="file" id={('image' + this.props.keyValue)}
                    onChange={this.chnageHandler.bind(this, this.props.keyValue)}
                    style={{display: 'none'}} />
                </div> 
              : null
          }
        </div>
    );
  }
  //Image div render ends here
	
}