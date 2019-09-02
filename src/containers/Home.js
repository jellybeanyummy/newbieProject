import React, { Component } from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoPostRequest, memoListRequest, memoEditRequest, memoRemoveRequest } from 'actions/memo';

class Home extends Component {
  state = {
    loadingState: false
  };

  componentDidMount() {
    const loadMemoLoop = () => {
      this.loadNewMemo().then(
        () => {
          this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
        }
      );
    };
    
    const loadUntilScrollable = () => {
      if($("body").height() < $(window).height()) {
        this.loadOldMemo().then(
          () => {
            if(!this.props.isLast) {
              loadUntilScrollable();
            }
          }
        );
      }
    };
    
    this.props.memoListRequest(true).then(
      () => {
        loadUntilScrollable();
        loadMemoLoop();
      }
    );

    $(window).scroll(() => {
      if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
        if(!this.state.loadingState){
          this.loadOldMemo();
          this.setState({
            loadingState: true
          });
        }
      } else {
        if(this.state.loadingState){
          this.setState({
            loadingState: false
          });
        }
      }
    });
  }
  
  componentWillUnmount() {
    clearTimeout(this.memoLoaderTimeoutId);
    $(window).unbind();
  }
 
  loadNewMemo() {
    if (this.props.listStatus === 'WAITING') 
      return new Promise((resolve, reject) => {
        resolve();
      });
    if (this.props.memoData.length === 0)
      return this.props.memoListRequest(true);
    return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
  }

  loadOldMemo = () => {
    if (this.props.isLast) {
      return new Promise(
        (resolve, reject) => {
          resolve();
        }
      );
    }
    let lastId = this.props.memoData[this.props.memoData.length - 1]._id;
    return this.props.memoListRequest(false, 'old', lastId, this.props.username).then(() => {
      if (this.props.isLast) {
        Materialize.toast('You are reading the last page', 2000);
      }
    });
  }
 
  handlePost = (contents) => {
    return this.props.memoPostRequest(contents).then(
      () => {
        if (this.props.postStatus.status === "SUCCESS") {
          this.loadNewMemo().then(
            () => {
              Materialize.toast('Success!', 2000);
            }
          );
        } else {
          let $toastContent;
          switch(this.props.postStatus.error) {
            case 1: 
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(()=> {location.reload(false);}, 2000);
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Contents should be string</span>');
              Materialize.toast($toastContent, 2000);
              break;
            case 3:
              $toastContent = $('<span style="color: #FFB4BA">Please write Something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            default:
              toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
              Materialize.toast($toastContent, 2000);
              break;
          }
        }
      }
    );
  }

  handleEdit = (id, index, contents) => {
    return this.props.memoEditRequest(id, index, contents).then(
      () => {
        if (this.props.editStatus.status === "SUCCESS") {
          Materialize.toast('Success!', 2000);
        } else {
          let errorMessage = [
            'Something broke',
            'Contents should be string',
            'Please write something',
            'You are not logged in',
            'That memo does not exist anymore',
            'You do not have permission'
          ];
          let error = this.props.editStatus.error;
          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
          Materialize.toast($toastContent, 2000);
          if(error === 4) {
            setTimeout(()=> {location.reload(false)}, 2000);
          }
        }
      }
    );
  }

  handleRemove = (id, index) => {
    this.props.memoRemoveRequest(id, index).then(() => {
      if (this.props.removeStatus.status === "SUCCESS") {
        setTimeout(() => {
          if($("body").height() < $(window).height()) {
            this.loadOldMemo();
          }
        }, 1000);
      } else {
        let errorMessage = [
          'Something broke',
          'You are not logged in',
          'That memo does not exist',
          'You do not have permission'
        ];
        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
        Materialize.toast($toastContent, 2000);
        if(this.props.removeStatus.error === 2) {
          setTimeout(()=> {location.reload(false)}, 2000);
        }
      }
    });
  }

  render() {
    const write = ( <Write onPost={this.handlePost}/> );
    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? write : undefined }
        <MemoList data={this.props.memoData}
                  currentUser={this.props.currentUser}
                  onEdit={this.handleEdit}
                  onRemove={this.handleRemove}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn, 
    postStatus: state.memo.post, 
    currentUser: state.authentication.status.currentUser, 
    memoData: state.memo.list.data, 
    listStatus: state.memo.list.status, 
    isLast: state.memo.list.isLast, 
    editStatus: state.memo.edit, 
    removeStatus: state.memo.remove
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username));
    }, 
    memoEditRequest: (id, index, contents) => {
      return dispatch(memoEditRequest(id, index, contents));
    }, 
    memoRemoveRequest: (id, index) => {
      return dispatch(memoRemoveRequest(id, index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
