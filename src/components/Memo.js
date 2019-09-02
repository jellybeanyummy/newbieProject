import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
 
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
  
  state = {
    editMode: false, 
    value: this.props.data.contents
  };
 
  toggleEdit = () => {
    if(this.state.editMode) {
      let id = this.props.data._id;
      let index = this.props.index;
      let contents = this.state.value;
            
      this.props.onEdit(id, index, contents).then(() => {
        this.setState({
          editMode: !this.state.editMode
        });
      })
    } else {
      this.setState({
        editMode: !this.state.editMode
      });   
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleRemove = () => {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onRemove(id, index);
  }

  handleStar = () => {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onStar(id, index);
  }

  render() {
    let editedInfo = (
      <span style={{color: '#AAB5BC'}}>  Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
    );
    let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;

    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button' 
          id={`dropdown-button-${this.props.data._id}`}
          data-activates={`dropdown-${this.props.data._id}`}>
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
          <li><a onClick={this.toggleEdit}>Edit</a></li>
          <li><a onClick={this.handleRemove}>Remove</a></li>
        </ul>
      </div>
    );

    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{this.props.data.writer}</a> wrote a log  <TimeAgo date={this.props.data.date.created}/>
            { this.props.data.is_edited ? editedInfo : undefined }
            { this.props.ownership ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          {this.props.data.contents}
        </div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button"
             style={starStyle}
             onClick={this.handleStar}>star</i>
            <span className="star-count">{this.props.data.starred.length}</span>
        </div>
      </div>
    );

    const editView = (
      <div className="write">
        <div className="card">
          <div className="card-content">
             <textarea
                className="materialize-textarea"
                value={this.state.value}
                onChange={this.handleChange}></textarea>
          </div>
          <div className="card-action">
             <a onClick={this.toggleEdit}>OK</a>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container memo">
        { this.state.editMode ? editView : memoView }
      </div>
    );
  }
}

Memo.propTypes = {
  data: PropTypes.object, 
  ownership: PropTypes.bool, 
  onEdit: PropTypes.func, 
  index: PropTypes.number, 
  onRemove: PropTypes.func, 
  onStar: PropTypes.func,
  currentUser: PropTypes.string
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
  ownership: true, 
  onEdit: (id, index, contents) => {
    console.error('onEdit function not defined');
  },
  index: -1, 
  onRemove: (id, index) => {
    console.error('remove function not defined');
  }, 
  onStar: (id, index) => {
    console.error('star function not defined');
  },
  currentUser: ''
}

export default Memo;
