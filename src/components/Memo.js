import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
 
class Memo extends Component {
  componentDidUpdate() {
    $('#dropdown-button-'+this.props.data._id).dropdown({
      belowOrigin: true
    });
  }
  
  componentDidMount() {
    $('#dropdown-button-'+this.props.data._id).dropdown({
      belowOrigin: true
    });
  }
  
  render() {
    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button' 
          id={`dropdown-button-${this.props.data._id}`}
          data-activates={`dropdown-${this.props.data._id}`}>
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
          <li><a>Edit</a></li>
          <li><a>Remove</a></li>
        </ul>
      </div>
    );

    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{this.props.data.writer}</a> wrote a log  1 seconds ago
            { this.props.ownership ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          {this.props.data.contents}
        </div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button">star</i>  
          <span className="star-count">0</span>
        </div>
      </div>
    );

    return (
      <div className="container memo">
        { memoView }      
      </div>
    );
  }
}

Memo.propTypes = {
  data: PropTypes.object, 
  ownership: PropTypes.bool
};

Memo.defaultPropss = {
  data: {
    _id: 'id1234567890',
    writer: 'Writer',
    contents: 'Contents',
    is_edited: false,
    date: {
      edited: new Date(),
      created: new Date()
    },
      starred: []
  },
  ownership: true
}

export default Memo;
