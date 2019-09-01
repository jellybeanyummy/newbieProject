import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Write extends Component {
  state = {
    contents: ''
  }
  
  handleChange = (e) => {
    this.setState({
      contents: e.target.value
    });
  }

  handlePost = () => {
    let contents = this.state.contents;
    this.Props.onPost(contents).then(
      () => {
        this.setState({
          contents: ""
        });
      }
    );
  }

  render() {
    return (
      <div className="container write">
        <div className="card">
          <div className="card-content">
            <textarea className="materialize-textarea"
                      placeholder="Scrap your imagination"
                      onChange={this.handleChange}
                      value={this.state.contents}></textarea>
          </div>
          <div className="card-action">
            <a onClick={this.handlePost}>POST</a>
          </div>
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  onPost: PropTypes.func
};

Write.defaultProps = {
  onPost: (contents) => { console.error("post function not defined"); }
};

export default Write;
